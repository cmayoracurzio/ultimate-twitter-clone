"use client";

import { useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, session) => {
      // Exclude INITIAL_SESSION event from refreshing the router
      if (event !== "INITIAL_SESSION") {
        router.refresh();
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
  }, [supabase, router]);

  return children;
}
