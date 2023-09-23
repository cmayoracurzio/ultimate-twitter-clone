"use client";

import { type UseFeedReturnType } from "@/hooks/useFeed";
import { CgSpinner } from "react-icons/cg";
import TweetCard from "@/components/cards/tweet-card";
import IconButton from "@/components/buttons/icon-button";

export default function Feed({ feed }: { feed: UseFeedReturnType }) {
  const {
    isLoading,
    tweets,
    updateTweetInFeed,
    handleBookmark,
    handleLike,
    handleShowMore,
    handleCopyLink,
    handleDelete,
    handleRefreshFeed,
  } = feed;

  if (isLoading) {
    return (
      <div className="flex items-start justify-center py-12">
        <div className="animate-spin text-primary">
          <CgSpinner size={40} />
        </div>
      </div>
    );
  } else {
    return (
      <>
        {tweets.map((tweet) => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            handleLike={() => handleLike(tweet, updateTweetInFeed)}
            handleBookmark={() => handleBookmark(tweet, updateTweetInFeed)}
            handleShowMore={() => handleShowMore(tweet)}
            handleCopyLink={() => handleCopyLink(tweet)}
            handleDelete={() => handleDelete(tweet)}
          />
        ))}
        <div className="flex items-start justify-center py-12 max-sm:mb-20">
          <IconButton onClick={handleRefreshFeed} variant="refresh" />
        </div>
      </>
    );
  }
}
