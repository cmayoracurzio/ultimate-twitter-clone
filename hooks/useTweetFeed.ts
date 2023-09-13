"use client";

import { useState, useEffect, useCallback, startTransition } from "react";
import { getURL } from "@/lib/utils/getURL";

export function useTweetFeed({
  feedType,
  profileId,
}: {
  feedType: FeedType;
  profileId: string | null;
}) {
  const [tweets, setTweets] = useState<TweetwithMetadata[]>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchTweets = useCallback(async () => {
    setLoading(true);
    const url = new URL(`${getURL()}/api/tweets`);
    const params = new URLSearchParams({ feedType: feedType });

    if (profileId) {
      params.append("profileId", profileId);
    }

    url.search = params.toString();
    const response = await fetch(url.href);

    let freshTweets: TweetwithMetadata[];
    if (!response.ok) {
      console.log(response);
      freshTweets = [];
    } else {
      freshTweets = await response.json();
    }
    startTransition(() => {
      setTweets(freshTweets);
      setLoading(false);
    });
  }, [feedType, profileId]);

  useEffect(() => {
    fetchTweets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addTweetToFeed = (newTweet: TweetwithMetadata) => {
    setTweets([newTweet, ...tweets]);
  };

  const updateTweetInFeed = (newTweet: TweetwithMetadata) => {
    const index = tweets.findIndex((tweet) => tweet.id === newTweet.id);
    const updatedTweets = [...tweets];
    updatedTweets[index] = newTweet;
    setTweets(updatedTweets);
  };

  const refreshFeed = () => {
    window.scrollTo(0, 0);
    fetchTweets();
  };

  return {
    tweets,
    isLoading,
    fetchTweets,
    addTweetToFeed,
    updateTweetInFeed,
    refreshFeed,
  };
}
