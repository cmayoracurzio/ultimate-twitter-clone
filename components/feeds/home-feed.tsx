"use client";

import { useFeed } from "@/hooks/useFeed";
import CreateTweetForm from "@/components/forms/create-tweet";
import Feed from "@/components/feeds/feed";

export default function HomeFeed({ profile }: { profile: Profile }) {
  const feed = useFeed({ type: "home" });

  return (
    <>
      <CreateTweetForm profile={profile} onFormSuccess={feed.addTweetToFeed} />
      <Feed {...feed} />
    </>
  );
}
