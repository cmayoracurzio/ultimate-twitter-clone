"use client";

import { createContext, useContext, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

type AuthContext = {
  maybeProfile: Profile | null;
};

const Context = createContext<AuthContext | undefined>(undefined);

export default function AuthProvider({
  profile = null,
  children,
}: {
  profile?: Profile | null;
  children: React.ReactNode;
}) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, session) => {
      router.refresh();
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, [supabase, router]);

  return (
    <Context.Provider value={{ maybeProfile: profile }}>
      {children}
    </Context.Provider>
  );
}

export const useProfile = () => {
  let context = useContext(Context);

  if (context === undefined) {
    throw new Error("useProfile must be used inside AuthProvider");
  }

  return context.maybeProfile;
};
