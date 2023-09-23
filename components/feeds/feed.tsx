"use client";

import { CgSpinner } from "react-icons/cg";
import { BiRefresh } from "react-icons/bi";
import TweetCard from "@/components/cards/tweet-card";
import { type UseFeedReturnType } from "@/hooks/useFeed";

export default function Feed({ feed }: { feed: UseFeedReturnType }) {
  const {
    isLoading,
    tweets,
    updateTweetInFeed,
    handleBookmark,
    handleLike,
    handleShowMore,
    handleCopyLink,
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
          />
        ))}
        <div className="flex items-start justify-center py-12 max-sm:mb-20">
          <button
            onClick={handleRefreshFeed}
            className="rounded-full bg-primary p-2 hover:bg-opacity-70"
          >
            <BiRefresh size={40} />
          </button>
        </div>
      </>
    );
  }
}
