"use client";

import { useState } from "react";
import { useFeed } from "@/hooks/useFeed";
import ProfileCard from "@/components/cards/profile-card";
import Tweets from "@/components/tweets";

export default function ProfileFeed({
  profile,
}: {
  profile: ProfileWithMetadata;
}) {
  const { tweets, isLoading, updateTweetInFeed, refreshFeed } = useFeed({
    type: "profile",
    profileId: profile.id,
  });

  return (
    <>
      <ProfileCard profile={profile} />
      <Tweets
        isLoading={isLoading}
        tweets={tweets}
        updateTweetInFeed={updateTweetInFeed}
        refreshFeed={refreshFeed}
      />
    </>
  );
}
