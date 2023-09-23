"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import TextButton from "@/components/buttons/text-button";

export default function SignOut() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <TextButton variant="primary" onClick={handleSignOut}>
      Sign out
    </TextButton>
  );
}
