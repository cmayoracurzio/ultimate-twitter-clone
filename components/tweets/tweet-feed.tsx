"use client";

import { useProfile } from "../providers/profile-provider";
import { useTweetFeed } from "@/hooks/useTweetFeed";
import Avatar from "../avatar";
import TweetForm from "./tweet-form";
import TweetCard from "./tweet-card/tweet-card";
import { CgSpinner } from "react-icons/cg";
import { BiRefresh } from "react-icons/bi";

export default function TweetFeed({
  feedType,
  profileId = null,
}: {
  feedType: FeedType;
  profileId?: string | null;
}) {
  const profile = useProfile();
  const { tweets, isLoading, addTweetToFeed, updateTweetInFeed, refreshFeed } =
    useTweetFeed({ feedType, profileId });

  return (
    <>
      {/* Tweet Form (only rendered in home page) */}
      {feedType === "home" ? (
        <div className="p-4 flex gap-4 items-start">
          <Avatar src={profile.avatar_url} />
          <TweetForm addTweetToFeed={addTweetToFeed} />
        </div>
      ) : null}

      {/* Tweets */}
      {isLoading ? (
        <div className="py-12 flex justify-center items-start">
          <div className="text-primary animate-spin">
            <CgSpinner size={40} />
          </div>
        </div>
      ) : (
        <>
          {tweets.map((tweet) => (
            <TweetCard
              key={tweet.id}
              tweet={tweet}
              updateTweetInFeed={updateTweetInFeed}
              showOptions={tweet.author.id === profile.id}
            />
          ))}

          {/* Refresh button */}
          <div className="max-sm:mb-20 py-12 flex justify-center items-start">
            <button
              onClick={refreshFeed}
              className="rounded-full p-2 bg-primary hover:bg-opacity-70"
            >
              <BiRefresh size={40} />
            </button>
          </div>
        </>
      )}
    </>
  );
}
