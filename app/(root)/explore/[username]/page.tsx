import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound } from "next/navigation";
import Header from "@/components/cards/header";
import Profile from "@/components/cards/profile";
import ProfileFeed from "@/components/feeds/profile-feed";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  // Fetch current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  // Fetch profile data
  const { data } = await supabase
    .from("profiles")
    .select("*, tweets(reply_to_id), likes(profile_id), bookmarks(profile_id)")
    .eq("username", params.username);

  // Throw error if profile data not found
  if (!data || data.length === 0) {
    notFound();
  }

  // Format inputs
  const profile = data[0];

  const stats = {
    tweets: profile.tweets.length,
    likes: profile.likes.length,
    replies: profile.tweets.filter((tweet) => tweet.reply_to_id !== null)
      .length,
    bookmarks: profile.bookmarks.length,
  };

  const showOptions = profile.id === user.id;

  return (
    <>
      <Header showGoBackButton>Profile</Header>
      <Profile profile={profile} stats={stats} showOptions={showOptions} />
      <ProfileFeed profileId={profile.id} />
    </>
  );
}
