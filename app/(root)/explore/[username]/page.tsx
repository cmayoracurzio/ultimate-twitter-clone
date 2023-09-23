import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound } from "next/navigation";

import Header from "@/components/header";
import BackButton from "@/components/buttons/back-button";
import ProfileFeed from "@/components/feeds/profile-feed";

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

  // Format profile data
  const profile = {
    avatar_url: data[0].avatar_url,
    created_at: data[0].created_at,
    full_name: data[0].full_name,
    id: data[0].id,
    updated_at: data[0].updated_at,
    username: data[0].username,
    stats: [
      { name: "tweets", count: data[0].tweets.length },
      { name: "likes", count: data[0].likes.length },
      {
        name: "replies",
        count: data[0].tweets.filter((tweet) => tweet.reply_to_id !== null)
          .length,
      },
      { name: "bookmarks", count: data[0].bookmarks.length },
    ],
  };

  return (
    <>
      <Header>
        <BackButton />
        <p>Profile</p>
      </Header>
      <ProfileFeed profile={profile} />
    </>
  );
}
