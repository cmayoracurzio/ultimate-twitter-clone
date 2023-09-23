"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Provider } from "@supabase/supabase-js";
import { getURL } from "@/lib/utils/getURL";
import TextButton from "@/components/buttons/text-button";

export default function SignIn({
  provider,
  label,
  children,
}: {
  provider: "google" | "github";
  label: string;
  children: React.ReactNode;
}) {
  const supabase = createClientComponentClient<Database>();

  async function handleSignIn(provider: Provider) {
    await supabase.auth.signInWithOAuth({
      provider: provider,
      options: { redirectTo: `${getURL()}login/callback` },
    });
  }

  return (
    <TextButton onClick={() => handleSignIn(provider)} variant="light">
      <div className="flex items-center justify-center gap-2">
        {children}
        <p>Sign in with {label}</p>
      </div>
    </TextButton>
  );
}
