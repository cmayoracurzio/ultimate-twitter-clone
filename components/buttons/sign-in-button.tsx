"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Provider } from "@supabase/supabase-js";
import { useCallback } from "react";
import { getURL } from "@/lib/utils/getURL";
import TextButton, {
  TextButtonVariant,
} from "@/components/buttons/text-button";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";

export default function SignIn({ provider }: { provider: Provider }) {
  const supabase = createClientComponentClient<Database>();

  const handleSignIn = useCallback(async () => {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${getURL()}login/callback` },
    });
  }, [provider, supabase]);

  const icon =
    provider === "google" ? <FcGoogle size={24} /> : <BsGithub size={24} />;
  const label = provider === "google" ? "Google" : "GitHub";

  return (
    <TextButton onClick={handleSignIn} variant={TextButtonVariant.Light}>
      <div className="flex items-center justify-center gap-2">
        {icon}
        <p>Sign in with {label}</p>
      </div>
    </TextButton>
  );
}
