"use client";

import { useFeed } from "@/hooks/useFeed";
import { CgSpinner } from "react-icons/cg";
import { Button } from "@/components/ui/button";
import Tweet from "@/components/cards/tweet";

export default function Feed({ feed }: { feed: ReturnType<typeof useFeed> }) {
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

      bottomButton = <Button onClick={handleRefreshFeed}>Try again</Button>;
    } else {
      bottomMessage = `No more ${
        type === "bookmarks" || type === "replies" ? type : "tweets"
      }`;
      bottomButton = (
        <Button onClick={() => window.scrollTo(0, 0)}>Back to top</Button>
      );
    }

    return (
      <>
        {tweets.map((tweet) => (
          <Tweet
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
          <p className="text-xl font-semibold tracking-tight">
            {bottomMessage}
          </p>
          <div className="w-fit">{bottomButton}</div>
        </div>
      </>
    );
  }
}
