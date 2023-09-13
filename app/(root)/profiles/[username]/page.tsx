import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import Header from "@/components/Header";
import ProfileCard from "@/components/profile-card/ProfileCard";
import TweetFeed from "@/components/TweetFeed";

export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const { data } = await supabase
    .from("profiles")
    .select(
      "*, tweets(profile_id), likes(profile_id), replies(profile_id), bookmarks(profile_id)"
    )
    .eq("username", params.username);

  if (!data) {
    throw new Error("Profile could not be found");
  }

  const visitedProfile = {
    ...data[0],
    tweets: data[0].tweets.length,
    likes: data[0].likes.length,
    replies: data[0].replies.length,
    bookmarks: data[0].bookmarks.length,
  };

  return (
    <>
      <Header>Profile</Header>
      <ProfileCard profile={visitedProfile} />
      <TweetFeed feedType="profile" profileId={visitedProfile.id} />
    </>
  );
}
