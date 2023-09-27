"use client";

import { useState, startTransition } from "react";
import { useFeed } from "@/hooks/useFeed";
import Tweet from "@/components/cards/tweet";
import CreateTweetForm from "@/components/forms/create-tweet";
import Feed from "@/components/feeds/feed";

export default function TweetFeed({
  initialTweet,
  profile,
}: {
  initialTweet: TweetwithMetadata;
  profile: Profile;
}) {
  const [mainTweet, setMainTweet] = useState<TweetwithMetadata>(initialTweet);
  const feed = useFeed({ type: "replies", tweetId: mainTweet.id });

  function addReplyToFeed(newTweet: TweetwithMetadata) {
    startTransition(() => {
      feed.addTweetToFeed(newTweet);
      const newMainTweet: TweetwithMetadata = {
        ...mainTweet,
        replies: mainTweet.replies + 1,
      };
      setMainTweet(newMainTweet);
    });
  }

  async function removeReplyFromFeed(tweetToRemove: TweetwithMetadata) {
    startTransition(() => {
      feed.handleDelete(tweetToRemove);
      const newMainTweet: TweetwithMetadata = {
        ...mainTweet,
        replies: mainTweet.replies - 1,
      };
      setMainTweet(newMainTweet);
    });
  }

  const updatedFeed = { ...feed, handleDelete: removeReplyFromFeed };

  return (
    <>
      <Tweet
        tweet={mainTweet}
        mainTweet={true}
        handleLike={() => feed.handleLike(mainTweet, setMainTweet)}
        handleBookmark={() => feed.handleBookmark(mainTweet, setMainTweet)}
        handleShowMore={() => {}}
        handleCopyUrl={() => feed.handleCopyUrl(mainTweet)}
        handleDelete={() => feed.handleDelete(mainTweet)}
      />
      <CreateTweetForm
        profile={profile}
        replyToId={mainTweet.id}
        onFormSuccess={addReplyToFeed}
      />
      <Feed {...updatedFeed} />
    </>
  );
}
