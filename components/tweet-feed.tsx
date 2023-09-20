"use client";

import { useProfile } from "@/components/providers/profile-provider";
import { useTweetFeed } from "@/hooks/useTweetFeed";
import Avatar from "@/components/avatar";
import TweetForm from "@/components/forms/tweet-form";
import TweetCard from "@/components/cards/tweet-card";
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
        <div className="flex items-start gap-4 p-4">
          <Avatar src={profile.avatar_url} />
          <TweetForm addTweetToFeed={addTweetToFeed} />
        </div>
      ) : null}

      {/* Tweets */}
      {isLoading ? (
        <div className="flex items-start justify-center py-12">
          <div className="animate-spin text-primary">
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
          <div className="flex items-start justify-center py-12 max-sm:mb-20">
            <button
              onClick={refreshFeed}
              className="rounded-full bg-primary p-2 hover:bg-opacity-70"
            >
              <BiRefresh size={40} />
            </button>
          </div>
        </>
      )}
    </>
  );
}
