"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import TweetCard from "./tweet-card/TweetCard";
import TweetComposer from "./TweetComposer";
import ProfilePhoto from "./shared/ProfilePhoto";

import { BiRefresh } from "react-icons/bi";

export default function TweetFeed({
  initialTweets,
  profile,
}: {
  initialTweets: TweetwithMetadata[];
  profile: Profile | null;
}) {
  const [tweets, setTweets] = useState(initialTweets);
  const router = useRouter();

  const addTweetToFeed = async (newTweet: TweetwithMetadata) => {
    setTweets([newTweet, ...tweets]);
  };

  const updateTweetInFeed = async (newTweet: TweetwithMetadata) => {
    const index = tweets.findIndex((tweet) => tweet.id === newTweet.id);
    const newOptimisticTweets = [...tweets];
    newOptimisticTweets[index] = newTweet;
    setTweets(newOptimisticTweets);
  };

  const refreshFeed = async () => {
    router.refresh();
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="p-4 flex gap-4 items-start">
        <ProfilePhoto src={profile?.avatar_url} />
        <TweetComposer addTweetToFeed={addTweetToFeed} />
      </div>
      <div className="flex flex-col divide-y divide-gray-600 border-t border-gray-600">
        {tweets.map((tweet) => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            updateTweetInFeed={updateTweetInFeed}
          />
        ))}
        <div className="h-full py-12 flex justify-center items-start">
          <button
            onClick={refreshFeed}
            className="rounded-full p-2 bg-primary hover:bg-opacity-70"
          >
            <BiRefresh size={40} />
          </button>
        </div>
      </div>
    </>
  );
}
