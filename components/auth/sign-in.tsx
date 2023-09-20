"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { Provider } from "@supabase/supabase-js";
import { getURL } from "@/lib/utils/getURL";

const providers = [
  { label: "Google", name: "google", icon: FcGoogle },
  { label: "GitHub", name: "github", icon: BsGithub },
] as const;

export default function SignIn() {
  const supabase = createClientComponentClient<Database>();

  const handleSignIn = async (provider: Provider) => {
    await supabase.auth.signInWithOAuth({
      provider: provider,
      options: { redirectTo: `${getURL()}login/callback` },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {providers.map((provider) => (
        <button
          key={provider.name}
          onClick={() => handleSignIn(provider.name)}
          className="rounded-full border border-gray-400 bg-white px-8 py-3 text-xl font-bold text-black hover:bg-opacity-70"
        >
          <div className="flex items-center justify-center gap-3">
            <provider.icon size={28} />
            <p>Sign in with {provider.label}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
