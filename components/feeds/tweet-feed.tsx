"use client";

import { useState } from "react";
import { useFeed } from "@/hooks/useFeed";
import Tweet from "@/components/cards/tweet";
import CreateTweet from "@/components/forms/create-tweet";
import Feed from "@/components/feeds/feed";

export default function TweetFeed({
  initialTweet,
}: {
  initialTweet: TweetwithMetadata;
}) {
  const [mainTweet, setMainTweet] = useState<TweetwithMetadata>(initialTweet);
  const feed = useFeed({ type: "replies", tweetId: mainTweet.id });

  // Add reply to feed and update reply count in Tweet
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
      <Tweet
        tweet={mainTweet}
        size="large"
        handleLike={() => feed.handleLike(mainTweet, setMainTweet)}
        handleBookmark={() => feed.handleBookmark(mainTweet, setMainTweet)}
        handleShowMore={() => feed.handleShowMore(mainTweet)}
        handleCopyUrl={() => feed.handleCopyUrl(mainTweet)}
        handleDelete={() => feed.handleDelete(mainTweet)}
      />
      <CreateTweet replyToId={mainTweet.id} onFormSuccess={addReplyToFeed} />
      <Feed feed={feed} />
    </>
  );
}
