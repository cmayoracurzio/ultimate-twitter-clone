"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function SignOut() {
  const supabase = createClientComponentClient<Database>();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <button
      onClick={handleSignOut}
      className="w-full rounded-full bg-primary px-5 py-2 text-center font-semibold text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      Sign out
    </button>
  );
}
