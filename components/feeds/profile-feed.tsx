"use client";

import { useFeed } from "@/hooks/useFeed";
import ProfileCard from "@/components/cards/profile-card";
import Feed from "@/components/feeds/base-feed";

export default function ProfileFeed({
  profile,
}: {
  profile: ProfileWithMetadata;
}) {
  const feed = useFeed({ type: "profile", profileId: profile.id });

  return (
    <>
      <ProfileCard profile={profile} />
      <Feed feed={feed} />
    </>
  );
}
