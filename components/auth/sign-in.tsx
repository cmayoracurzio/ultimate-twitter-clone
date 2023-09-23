"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { Provider } from "@supabase/supabase-js";
import { getURL } from "@/lib/utils/getURL";
import TextButton from "@/components/buttons/text-button";

const providers = [
  { label: "Google", name: "google", icon: FcGoogle },
  { label: "GitHub", name: "github", icon: BsGithub },
] as const;

export default function SignIn() {
  const supabase = createClientComponentClient<Database>();

  async function handleSignIn(provider: Provider) {
    await supabase.auth.signInWithOAuth({
      provider: provider,
      options: { redirectTo: `${getURL()}login/callback` },
    });
  }

  return (
    <div className="flex flex-col gap-4">
      {providers.map((provider) => (
        <TextButton
          key={provider.name}
          onClick={() => handleSignIn(provider.name)}
          variant="light"
        >
          <div className="flex items-center justify-center gap-2">
            <provider.icon size={24} />
            <p>Sign in with {provider.label}</p>
          </div>
        </TextButton>
      ))}
    </div>
  );
}
