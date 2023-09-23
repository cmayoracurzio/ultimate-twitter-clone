"use client";

import { useState } from "react";
import { useProfile } from "@/components/providers/profile-provider";
import { useFeed } from "@/hooks/useFeed";
import MainTweetCard from "@/components/cards/main-tweet-card";
import Avatar from "@/components/avatar";
import TweetForm from "@/components/forms/tweet-form";
import Feed from "@/components/feeds/feed";

export default function TweetFeed({
  initialTweet,
}: {
  initialTweet: TweetwithMetadata;
}) {
  const [mainTweet, setMainTweet] = useState<TweetwithMetadata>(initialTweet);
  const { avatar_url } = useProfile();
  const feed = useFeed({ type: "replies", tweetId: mainTweet.id });

  // Add reply to feed and update reply count in MainTweetCard
  function addReplyToFeed(newTweet: TweetwithMetadata) {
    feed.addTweetToFeed(newTweet);
    const newMainTweet: TweetwithMetadata = {
      ...mainTweet,
      replies: mainTweet.replies + 1,
    };
    setMainTweet(newMainTweet);
  }

  return (
    <>
      <MainTweetCard
        tweet={mainTweet}
        handleLike={() => feed.handleLike(mainTweet, setMainTweet)}
        handleBookmark={() => feed.handleBookmark(mainTweet, setMainTweet)}
        handleShowMore={() => feed.handleShowMore(mainTweet)}
        handleCopyLink={() => feed.handleCopyLink(mainTweet)}
      />
      <div className="flex items-start gap-4 p-4">
        <Avatar src={avatar_url} />
        <TweetForm replyToId={mainTweet.id} addTweetToFeed={addReplyToFeed} />
      </div>
      <Feed feed={feed} />
    </>
  );
}
