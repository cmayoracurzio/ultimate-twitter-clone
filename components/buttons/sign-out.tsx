"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function SignOut() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <Button onClick={handleSignOut} width="full">
      Sign out
    </Button>
  );
}
