import { useState, useEffect, useRef } from "react";
import { User } from "@supabase/supabase-js";
import { supabase, type Profile } from "@/lib/supabase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);
  const hasFetchedProfile = useRef(false);

  const fetchProfile = async (userId: string) => {
    if (hasFetchedProfile.current) {
      console.debug("ℹ️ Profile already fetched, skipping.");
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
        return;
      }

      setProfile(data as Profile);
    } catch (err) {
      console.error("❌ Unexpected error fetching profile:", err);
      setProfile(null);
    } finally {
      hasFetchedProfile.current = true;
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    console.log("✅ useAuth initialized");

    let authSubscription: { unsubscribe: () => void } | null = null;

    const initAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        const currentUser = session?.user ?? null;
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
        setAuthLoading(false);
      }

      // ✅ Subscribe once
      const { data } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          const newUser = session?.user ?? null;
          if (newUser?.id !== user?.id) {
            setUser(newUser);

            if (newUser) {
              hasFetchedProfile.current = false;
              await fetchProfile(newUser.id);
            } else {
              setProfile(null);
            }
          }
        }
      );

      authSubscription = data.subscription;
    };

    initAuth();

    return () => {
      authSubscription?.unsubscribe();
    };
    // ✅ Empty dependency array so this only runs once
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) console.error("❌ Sign in error:", error.message);
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
      setProfile(null);
      hasFetchedProfile.current = false;
    } else {
      console.error("❌ Sign out error:", error.message);
    }
    return { error };
  };

  const isAdmin = profile?.role === "admin";

  return {
    user,
    profile,
    isAdmin,
    authLoading,
    profileLoading,
    signIn,
    signOut,
  };
}  
