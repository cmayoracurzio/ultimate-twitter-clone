"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FcGoogle } from "react-icons/fc";
import { BsGithub } from "react-icons/bs";
import { Provider } from "@supabase/supabase-js";

const providers = [
  { label: "Google", name: "google", icon: FcGoogle },
  { label: "GitHub", name: "github", icon: BsGithub },
] as const;

export default function SignIn() {
  const supabase = createClientComponentClient();

  const handleSignIn = async (provider: Provider) => {
    await supabase.auth.signInWithOAuth({
      provider: provider,
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
  };

  return (
    <div className="flex flex-col gap-4">
      {providers.map((provider) => (
        <button
          key={provider.name}
          onClick={() => handleSignIn(provider.name)}
          className="bg-white rounded-full px-8 py-3 border border-gray-400 text-black text-xl font-bold hover:bg-opacity-70"
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
