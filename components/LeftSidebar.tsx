import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import NavigationLinks from "./NavigationLinks";
import ProfileButton from "./ProfileButton";
import TweetButton from "./TweetButton";

export default async function LeftSidebar() {
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
    <nav className="max-sm:hidden sticky top-0 left-0 h-screen max-w-[300px] py-8 px-4 xl:px-8">
      <div className="h-full flex flex-col justify-between items-center">
        <NavigationLinks />
        <TweetButton />
        <ProfileButton profile={profile} />
      </div>
    </nav>
  );
}
