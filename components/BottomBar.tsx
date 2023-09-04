import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import NavigationLinks from "./NavigationLinks";
import ProfileButton from "./ProfileButton";
import TweetButton from "./TweetButton";

export default async function BottomBar() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  // Fetch profile information
  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id);

  const profile = profileData?.[0] ?? null;

  return (
    <section className="fixed bottom-0 z-10 w-full bg-gray-900 border-t border-gray-600 p-4 sm:hidden">
      <NavigationLinks />
    </section>
  );
}
