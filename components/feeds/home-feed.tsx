"use client";

import { useProfile } from "@/components/providers/profile-provider";
import { useFeed } from "@/hooks/useFeed";
import Avatar from "@/components/avatar";
import TweetForm from "@/components/forms/tweet-form";
import Tweets from "@/components/tweets";

export default function HomeFeed() {
  const { avatar_url } = useProfile();
  const { tweets, isLoading, addTweetToFeed, updateTweetInFeed, refreshFeed } =
    useFeed({ type: "home" });

  return (
    <>
      <div className="flex items-start gap-4 p-4">
        <Avatar src={avatar_url} />
        <TweetForm addTweetToFeed={addTweetToFeed} />
      </div>
      <Tweets
        isLoading={isLoading}
        tweets={tweets}
        updateTweetInFeed={updateTweetInFeed}
        refreshFeed={refreshFeed}
      />
    </>
  );
}
