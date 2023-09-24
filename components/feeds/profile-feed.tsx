"use client";

import { useFeed, FeedType } from "@/hooks/useFeed";
import ProfileCard from "@/components/cards/profile-card";
import Feed from "@/components/feeds/feed";

export default function ProfileFeed({
  profile,
}: {
  profile: ProfileWithMetadata;
}) {
  const feed = useFeed({ type: FeedType.Profile, profileId: profile.id });

  return (
    <>
      <ProfileCard profile={profile} />
      <Feed feed={feed} />
    </>
  );
}
