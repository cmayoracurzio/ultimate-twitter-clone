"use client";

import { useState } from "react";
import { useProfile } from "@/components/providers/profile-provider";
import { useFeed } from "@/hooks/useFeed";
import MainTweetCard from "@/components/cards/main-tweet-card";
import Avatar from "@/components/avatar";
import TweetForm from "@/components/forms/tweet-form";
import Tweets from "@/components/tweets";

export default function TweetFeed({
  initialTweet,
}: {
  initialTweet: TweetwithMetadata;
}) {
  const [tweet, setTweet] = useState<TweetwithMetadata>(initialTweet);
  const { avatar_url } = useProfile();
  const {
    tweets: replies,
    isLoading,
    addTweetToFeed,
    updateTweetInFeed,
    refreshFeed,
  } = useFeed({ type: "replies", tweetId: tweet.id });

  // Add reply to feed and update reply count in MainTweetCard
  function addReplyToFeed(newTweet: TweetwithMetadata) {
    addTweetToFeed(newTweet);
    const newMainTweet: TweetwithMetadata = {
      ...tweet,
      replies: tweet.replies + 1,
    };
    setTweet(newMainTweet);
  }

  return (
    <>
      <MainTweetCard tweet={tweet} updateMainTweet={setTweet} />
      <div className="flex items-start gap-4 p-4">
        <Avatar src={avatar_url} />
        <TweetForm replyToId={tweet.id} addTweetToFeed={addReplyToFeed} />
      </div>
      <Tweets
        isLoading={isLoading}
        tweets={replies}
        updateTweetInFeed={updateTweetInFeed}
        refreshFeed={refreshFeed}
      />
    </>
  );
}
