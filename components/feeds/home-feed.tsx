"use client";

import { useFeed } from "@/hooks/useFeed";
import CreateTweet from "@/components/forms/create-tweet";
import Feed from "@/components/feeds/feed";

export default function HomeFeed() {
  const feed = useFeed({ type: "home" });

  return (
    <>
      <CreateTweet onFormSuccess={feed.addTweetToFeed} />
      <Feed feed={feed} />
    </>
  );
}
