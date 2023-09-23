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

  async function handleSignIn(provider: Provider) {
    await supabase.auth.signInWithOAuth({
      provider: provider,
      options: { redirectTo: `${getURL()}login/callback` },
    });
  }

  return (
    <div className="flex flex-col gap-4">
      {providers.map((provider) => (
        <button
          key={provider.name}
          onClick={() => handleSignIn(provider.name)}
          className="rounded-full bg-white px-6 py-3 text-xl font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200"
        >
          <div className="flex items-center justify-center gap-3">
            <provider.icon size={24} />
            <p>Sign in with {provider.label}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
