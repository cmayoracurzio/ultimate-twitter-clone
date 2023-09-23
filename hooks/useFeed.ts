"use client";

import { useState, useEffect, useCallback, startTransition } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getURL } from "@/lib/utils/getURL";

export type UseFeedReturnType = {
  tweets: TweetwithMetadata[];
  isLoading: boolean;
  fetchTweets: () => void;
  addTweetToFeed: (newTweet: TweetwithMetadata) => void;
  updateTweetInFeed: (newTweet: TweetwithMetadata) => void;
  handleLike: (
    tweet: TweetwithMetadata,
    updateTweetInFeed: (newTweet: TweetwithMetadata) => void,
  ) => Promise<void>;
  handleBookmark: (
    tweet: TweetwithMetadata,
    updateTweetInFeed: (newTweet: TweetwithMetadata) => void,
  ) => Promise<void>;
  handleShowMore: (tweet: TweetwithMetadata) => void;
  handleCopyLink: (tweet: TweetwithMetadata) => Promise<void>;
  handleRefreshFeed: () => void;
};

export function useFeed({
  type,
  profileId,
  tweetId,
}: {
  type: "home" | "bookmarks" | "profile" | "replies";
  profileId?: string;
  tweetId?: string;
}): UseFeedReturnType {
  const [tweets, setTweets] = useState<TweetwithMetadata[]>([]);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const fetchTweets = useCallback(async () => {
    setLoading(true);
    router.refresh();
    let freshTweets: TweetwithMetadata[] = [];

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      let query;

      if (type === "home") {
        query = supabase
          .from("tweets")
          .select(
            "*, author: profiles(*), likes(profile_id), bookmarks(profile_id), replies: tweets!reply_to_id(profile_id)",
          );
      } else if (type === "bookmarks") {
        query = supabase
          .from("tweets")
          .select(
            "*, author: profiles(*), likes(profile_id), bookmarks!inner(*), replies: tweets!reply_to_id(profile_id)",
          )
          .eq("bookmarks.profile_id", user.id);
      } else if (type === "profile" && profileId) {
        query = supabase
          .from("tweets")
          .select(
            "*, author: profiles(*), likes(profile_id), bookmarks(profile_id),  replies: tweets!reply_to_id(profile_id)",
          )
          .eq("profile_id", profileId);
      } else if (type === "replies" && tweetId) {
        query = supabase
          .from("tweets")
          .select(
            "*, author: profiles(*), likes(profile_id), bookmarks(profile_id), replies: tweets!reply_to_id(profile_id)",
          )
          .eq("reply_to_id", tweetId);
      }

      // Sort by creation date and limit to 20 tweets
      if (query) {
        query = query.order("created_at", { ascending: false }).limit(20);
        const { data } = await query;

        // Format the fresh tweets
        freshTweets =
          data?.map((tweet) => ({
            ...tweet,
            author: Array.isArray(tweet.author)
              ? tweet.author[0]
              : tweet.author,
            replies: tweet.replies.length,
            likes: tweet.likes.length,
            likedByUser: tweet.likes.some(
              (like) => like.profile_id === user.id,
            ),
            bookmarkedByUser: tweet.bookmarks.some(
              (bookmark) => bookmark.profile_id === user.id,
            ),
          })) ?? [];
      }
    }
    startTransition(() => {
      setTweets(freshTweets);
      setLoading(false);
    });
  }, [router, supabase, type, profileId, tweetId]);

  useEffect(() => {
    fetchTweets();
  }, [fetchTweets]);

  function addTweetToFeed(newTweet: TweetwithMetadata) {
    setTweets([newTweet, ...tweets]);
  }

  function updateTweetInFeed(newTweet: TweetwithMetadata) {
    const index = tweets.findIndex((tweet) => tweet.id === newTweet.id);
    const updatedTweets = [...tweets];
    updatedTweets[index] = newTweet;
    setTweets(updatedTweets);
  }

  // Function for refresh feed button
  function handleRefreshFeed() {
    window.scrollTo(0, 0);
    fetchTweets();
  }

  // Function for reply button and show more button
  function handleShowMore(tweet: TweetwithMetadata) {
    router.push(`/explore/${tweet.author.username}/${tweet.id}`);
  }

  // Function for copy link button
  async function handleCopyLink(tweet: TweetwithMetadata) {
    const tweetUrl = `${getURL()}explore/${tweet.author.username}/${tweet.id}`;
    await navigator.clipboard.writeText(tweetUrl);
  }

  // Function for like button
  async function handleLike(
    tweet: TweetwithMetadata,
    updateTweetInFeed: (newTweet: TweetwithMetadata) => void,
  ) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      if (tweet.likedByUser) {
        updateTweetInFeed({
          ...tweet,
          likes: tweet.likes - 1,
          likedByUser: !tweet.likedByUser,
        });
        await supabase
          .from("likes")
          .delete()
          .match({ profile_id: user.id, tweet_id: tweet.id });
      } else {
        updateTweetInFeed({
          ...tweet,
          likes: tweet.likes + 1,
          likedByUser: !tweet.likedByUser,
        });
        await supabase
          .from("likes")
          .insert({ tweet_id: tweet.id, profile_id: user.id });
      }
    }
  }

  // Function for bookmark button
  async function handleBookmark(
    tweet: TweetwithMetadata,
    updateTweetInFeed: (newTweet: TweetwithMetadata) => void,
  ) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user !== null) {
      if (tweet.bookmarkedByUser) {
        updateTweetInFeed({
          ...tweet,
          bookmarkedByUser: !tweet.bookmarkedByUser,
        });
        await supabase
          .from("bookmarks")
          .delete()
          .match({ profile_id: user.id, tweet_id: tweet.id });
      } else {
        updateTweetInFeed({
          ...tweet,
          bookmarkedByUser: !tweet.bookmarkedByUser,
        });
        await supabase
          .from("bookmarks")
          .insert({ tweet_id: tweet.id, profile_id: user.id });
      }
    }
  }

  return {
    tweets,
    isLoading,
    fetchTweets,
    addTweetToFeed,
    updateTweetInFeed,
    handleLike,
    handleBookmark,
    handleShowMore,
    handleCopyLink,
    handleRefreshFeed,
  };
}