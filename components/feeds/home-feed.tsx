"use client";

import { useFeed } from "@/hooks/useFeed";
import CreateTweetForm from "@/components/forms/create-tweet";
import Feed from "@/components/feeds/feed";

export default function HomeFeed() {
  const feed = useFeed({ type: "home" });

  return (
    <>
      <CreateTweetForm onFormSuccess={feed.addTweetToFeed} />
      <Feed {...feed} />
    </>
  );
}
