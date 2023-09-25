"use client";

import { useFeed } from "@/hooks/useFeed";
import Feed from "@/components/feeds/feed";

export default function ProfileFeed({ profileId }: { profileId: string }) {
  const feed = useFeed({ type: "profile", profileId });
  return <Feed feed={feed} />;
}
