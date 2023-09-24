"use client";

import { type UseFeedReturnType } from "@/hooks/useFeed";
import { CgSpinner } from "react-icons/cg";
import TweetCard from "@/components/cards/tweet-card";
import TextButton, {
  TextButtonVariant,
} from "@/components/buttons/text-button";

export default function Feed({ feed }: { feed: UseFeedReturnType }) {
  const {
    type,
    isLoading,
    tweets,
    updateTweetInFeed,
    handleBookmark,
    handleLike,
    handleShowMore,
    handleCopyUrl,
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
    let bottomMessage;
    let bottomButton;
    if (tweets.length === 0) {
      bottomMessage = `No ${
        type === "bookmarks" || type === "replies" ? type : "tweets"
      } found`;
      bottomButton = (
        <TextButton
          onClick={handleRefreshFeed}
          variant={TextButtonVariant.Primary}
        >
          Try again
        </TextButton>
      );
    } else {
      bottomMessage = `No more ${
        type === "bookmarks" || type === "replies" ? type : "tweets"
      }`;
      bottomButton = (
        <TextButton
          onClick={() => window.scrollTo(0, 0)}
          variant={TextButtonVariant.Primary}
        >
          Back to top
        </TextButton>
      );
    }

    return (
      <>
        {tweets.map((tweet) => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            handleLike={() => handleLike(tweet, updateTweetInFeed)}
            handleBookmark={() => handleBookmark(tweet, updateTweetInFeed)}
            handleShowMore={() => handleShowMore(tweet)}
            handleCopyUrl={() => handleCopyUrl(tweet)}
            handleDelete={() => handleDelete(tweet)}
          />
        ))}
        <div className="flex flex-col items-center gap-6 py-12 max-sm:mb-24">
          <p className="text-xl font-bold tracking-tight">{bottomMessage}</p>
          <div className="w-fit">{bottomButton}</div>
        </div>
      </>
    );
  }
}
