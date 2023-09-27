"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Provider } from "@supabase/supabase-js";
import { getBaseUrl } from "@/lib/utils/getBaseUrl";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

export default function SignIn({ provider }: { provider: Provider }) {
  const supabase = createClientComponentClient<Database>();

  async function handleSignIn() {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${getBaseUrl()}login/callback` },
    });
  }

  return (
    <Button onClick={handleSignIn} variant="secondary">
      {provider === "google" ? <FcGoogle size={24} /> : <BsGithub size={24} />}
      <span>Sign in with {provider === "google" ? "Google" : "GitHub"}</span>
    </Button>
  );
}
