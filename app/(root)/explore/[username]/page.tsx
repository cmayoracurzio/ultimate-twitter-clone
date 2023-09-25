import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound } from "next/navigation";
import Header from "@/components/ui/header";
import Profile from "@/components/cards/profile";
import ProfileFeed from "@/components/feeds/profile-feed";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  // Fetch profile data
  const { data } = await supabase
    .from("profiles")
    .select("*, tweets(reply_to_id), likes(profile_id), bookmarks(profile_id)")
    .eq("username", params.username);

  // Throw error if profile data not found
  if (!data || data.length === 0) {
    notFound();
  }

  // Helper function to get the correct singular/plural stat name
  const getStatName = (name: string, count: number) => {
    if (name === "reply") {
      return count !== 1 ? "replies" : name;
    } else {
      return count !== 1 ? name + "s" : name;
    }
  };

  // Format stats
  const profileData = data[0];
  const stats = [
    { name: "tweet", count: profileData.tweets.length },
    { name: "like", count: profileData.likes.length },
    {
      name: "reply",
      count: profileData.tweets.filter((tweet) => tweet.reply_to_id !== null)
        .length,
    },
    { name: "bookmark", count: profileData.bookmarks.length },
  ].map((stat) => ({ ...stat, name: getStatName(stat.name, stat.count) }));

  // Format profile data
  const profile = {
    avatar_url: profileData.avatar_url,
    created_at: profileData.created_at,
    full_name: profileData.full_name,
    id: profileData.id,
    updated_at: profileData.updated_at,
    username: profileData.username,
    stats,
  };

  return (
    <>
      <Header showGoBackButton>Profile</Header>
      <Profile profile={profile} />
      <ProfileFeed profileId={profile.id} />
    </>
  );
}
