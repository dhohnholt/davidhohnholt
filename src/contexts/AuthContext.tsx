// /src/contexts/AuthContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import type { User, Session, AuthError } from "@supabase/supabase-js";
import { supabase, type Profile } from "@/lib/supabase";

interface AuthContextProps {
  user: User | null;
  profile: Profile | null;
  authLoading: boolean;
  profileLoading: boolean;
  isAdmin: boolean;
  signIn: (
    email: string,
    password: string
  ) => Promise<{ data: { session: Session | null } | null; error: AuthError | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  refetchProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  // --------------------------------------------------
  // Fetch profile for a given user id
  // --------------------------------------------------
  const fetchProfile = useCallback(async (userId: string) => {
    if (!userId) return;

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
        setProfile(data as Profile);
      }
    } catch (err) {
      console.error("❌ Unexpected error fetching profile:", err);
      setProfile(null);
    } finally {
      setProfileLoading(false);
    }
  }, []);

  // --------------------------------------------------
  // Initialize auth from Supabase session (cookie/local)
  // and subscribe to auth state changes
  // --------------------------------------------------
  useEffect(() => {
    let isMounted = true;
    let subscription:
      | ReturnType<
          typeof supabase.auth.onAuthStateChange
        >["data"]["subscription"]
      | null = null;

    const initAuth = async () => {
      try {
        // ✅ Read session from Supabase (internally uses cookies/local storage)
        const { data, error } = await supabase.auth.getSession();

        if (error) {
          console.error("❌ Error getting session:", error.message);
        }

        const session = data?.session ?? null;
        const currentUser = session?.user ?? null;

        if (!isMounted) return;

        setUser(currentUser);

        if (currentUser) {
          await fetchProfile(currentUser.id);
        } else {
          setProfile(null);
        }
      } catch (err) {
        console.error("❌ Error initializing auth:", err);
        setUser(null);
        setProfile(null);
      } finally {
        if (isMounted) {
          setAuthLoading(false);
        }
      }

      // ✅ Listen for login / logout / token refresh
      const { data: listener } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          const nextUser = session?.user ?? null;

          setUser(nextUser);

          if (nextUser) {
            await fetchProfile(nextUser.id);
          } else {
            setProfile(null);
          }
        }
      );

      subscription = listener.subscription;
    };

    initAuth();

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, [fetchProfile]);

  // --------------------------------------------------
  // Sign in – Supabase sets/updates session cookie
  // --------------------------------------------------
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error && data?.session?.user) {
      // ensure immediate UI update; listener will also fire
      setUser(data.session.user);
      await fetchProfile(data.session.user.id);
    } else if (error) {
      console.error("❌ Sign in error:", error.message);
    }

    return { data, error };
  };

  // --------------------------------------------------
  // Sign out – clears Supabase session (cookie/local)
  // --------------------------------------------------
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (!error) {
      setUser(null);
      setProfile(null);
    } else {
      console.error("❌ Sign out error:", error.message);
    }

    return { error };
  };

  const refetchProfile = async () => {
    if (user?.id) {
      await fetchProfile(user.id);
    } else {
      console.warn("⚠️ Tried refetchProfile, but no user is logged in");
    }
  };

  const isAdmin = profile?.role === "admin";

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
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
}
