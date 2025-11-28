// /home/project/src/contexts/AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  ReactNode,
} from "react";
import { User } from "@supabase/supabase-js";
import { supabase, Profile } from "@/lib/supabase";

interface AuthContextProps {
  user: User | null;
  profile: Profile | null;
  authLoading: boolean;
  profileLoading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>;
  signOut: () => Promise<{ error: any }>;
  refetchProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const hasFetchedProfile = useRef(false);

  console.log("✅ AuthProvider rendered");

  // ✅ Fetch user profile
  const fetchProfile = async (userId: string) => {
    console.log(`🔄 fetchProfile called for userId: ${userId}`);
    if (!userId) {
      console.warn("⚠️ No userId passed to fetchProfile");
      return;
    }

    setProfileLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      if (error) {
        console.error("❌ Error fetching profile:", error.message);
        setProfile(null);
      } else {
        console.log("✅ Profile fetched:", data);
        setProfile(data);
      }
    } catch (err) {
      console.error("❌ Unexpected error fetching profile:", err);
      setProfile(null);
    } finally {
      hasFetchedProfile.current = true;
      setProfileLoading(false);
    }
  };

  // ✅ Allow manual profile refresh (e.g., after updates)
  const refetchProfile = async () => {
    if (user?.id) {
      console.log("🔄 Refetching profile manually...");
      hasFetchedProfile.current = false;
      await fetchProfile(user.id);
    } else {
      console.warn("⚠️ Tried to refetchProfile, but no user is logged in");
    }
  };

  useEffect(() => {
    console.log("🔄 useEffect(initAuth) triggered. Current user:", user?.email);

    let authSubscription: any;

    const initAuth = async () => {
      console.log("🚀 Initializing auth...");
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const currentUser = session?.user ?? null;
        console.log("✅ Session retrieved:", currentUser);

        setUser(currentUser);

        if (currentUser && !hasFetchedProfile.current) {
          console.log("🔄 Fetching profile for logged-in user...");
          await fetchProfile(currentUser.id);
        } else {
          console.log("ℹ️ No current user or profile already fetched");
          setProfile(null);
        }
      } catch (err) {
        console.error("❌ Error initializing auth:", err);
        setUser(null);
        setProfile(null);
      } finally {
        console.log("✅ Auth initialization complete. Setting authLoading=false");
        setAuthLoading(false);
      }

      // ✅ Handle auth state changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log(`🔄 Auth state changed: ${event}`, session);
        const newUser = session?.user ?? null;

        if (newUser?.id !== user?.id) {
          console.log("🔄 Updating user in context:", newUser);
          setUser(newUser);

          if (newUser) {
            hasFetchedProfile.current = false;
            await fetchProfile(newUser.id);
          } else {
            console.log("ℹ️ No user found after state change, clearing profile");
            setProfile(null);
          }
        } else {
          console.log("ℹ️ User unchanged, skipping profile fetch");
        }
      });

      authSubscription = subscription;
    };

    initAuth();

    return () => {
      console.log("🧹 Cleaning up auth subscription");
      authSubscription?.unsubscribe();
    };
  }, [user?.id]);

  const signIn = async (email: string, password: string) => {
    console.log(`🚀 signIn called for: ${email}`);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("❌ Sign in error:", error.message);
    } else {
      console.log("✅ Sign in successful:", data.session?.user?.email);
    }

    return { data, error };
  };

  const signOut = async () => {
    console.log("🚀 Signing out...");
    const { error } = await supabase.auth.signOut();
    if (!error) {
      console.log("✅ Signed out successfully");
      setUser(null);
      setProfile(null);
      hasFetchedProfile.current = false;
    } else {
      console.error("❌ Sign out error:", error.message);
    }
    return { error };
  };

  const isAdmin = profile?.role === "admin";

  console.log("🔍 AuthContext State:", {
    user: user?.email || null,
    profile,
    authLoading,
    profileLoading,
    isAdmin,
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        authLoading,
        profileLoading,
        isAdmin,
        signIn,
        signOut,
        refetchProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}