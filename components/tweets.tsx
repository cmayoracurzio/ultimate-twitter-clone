"use client";

import { CgSpinner } from "react-icons/cg";
import { BiRefresh } from "react-icons/bi";
import TweetCard from "./cards/tweet-card";

export default function Tweets({
  isLoading,
  tweets,
  updateTweetInFeed,
  refreshFeed,
}: {
  isLoading: boolean;
  tweets: TweetwithMetadata[];
  updateTweetInFeed: (newTweet: TweetwithMetadata) => void;
  refreshFeed: () => void;
}) {
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
            updateTweetInFeed={updateTweetInFeed}
          />
        ))}
        <div className="flex items-start justify-center py-12 max-sm:mb-20">
          <button
            onClick={refreshFeed}
            className="rounded-full bg-primary p-2 hover:bg-opacity-70"
          >
            <BiRefresh size={40} />
          </button>
        </div>
      </>
    );
  }
}
