"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Provider } from "@supabase/supabase-js";
import { getBaseUrl } from "@/lib/utils/getBaseUrl";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

export default function SignIn() {
  const supabase = createClientComponentClient<Database>();

  async function handleSignIn(provider: Provider) {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${getBaseUrl()}login/callback` },
    });
  }

  return (
    <div className="flex flex-col space-y-4">
      <Button
        onClick={() => handleSignIn("google")}
        variant="clear"
        size="lg"
        border="default"
      >
        <FcGoogle size={24} />
        <span>Sign in with Google</span>
      </Button>
      <Button
        onClick={() => handleSignIn("github")}
        variant="clear"
        size="lg"
        border="default"
      >
        <BsGithub size={24} />
        <span>Sign in with GitHub</span>
      </Button>
    </div>
  );
}
