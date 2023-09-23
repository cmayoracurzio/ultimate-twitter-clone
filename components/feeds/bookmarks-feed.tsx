"use client";

import { useFeed } from "@/hooks/useFeed";
import Tweets from "@/components/tweets";

export default function BookmarksFeed() {
  const { tweets, isLoading, updateTweetInFeed, refreshFeed } = useFeed({
    type: "bookmarks",
  });

  return (
    <Tweets
      isLoading={isLoading}
      tweets={tweets}
      updateTweetInFeed={updateTweetInFeed}
      refreshFeed={refreshFeed}
    />
  );
}
