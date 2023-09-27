"use client";

import { useFeed } from "@/hooks/useFeed";
import Feed from "@/components/feeds/feed";

export default function BookmarksFeed() {
  const feed = useFeed({ type: "bookmarks" });
  return <Feed {...feed} />;
}
