"use client";

import { useFeed, FeedType } from "@/hooks/useFeed";
import Feed from "@/components/feeds/feed";

export default function BookmarksFeed() {
  const feed = useFeed({ type: FeedType.Bookmarks });
  return <Feed feed={feed} />;
}
