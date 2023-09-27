"use client";

import { useState, useEffect, useCallback, startTransition } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { getBaseUrl } from "@/lib/utils/getBaseUrl";

export function useFeed({
  type,
  profileId,
  tweetId,
}: {
  type: "home" | "bookmarks" | "profile" | "replies";
  profileId?: string;
  tweetId?: string;
}) {
  const [tweets, setTweets] = useState<TweetwithMetadata[]>([]);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClientComponentClient<Database>();

  const fetchTweets = useCallback(async () => {
    setLoading(true);
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
            createdByUser: tweet.author?.id === user.id,
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
  }, [supabase, type, profileId, tweetId]);

  useEffect(() => {
    fetchTweets();
  }, [fetchTweets]);

  function addTweetToFeed(tweetToAdd: TweetwithMetadata) {
    setTweets((prevTweets) => [tweetToAdd, ...prevTweets]);
  }

  function updateTweetInFeed(tweetToUpdate: TweetwithMetadata) {
    setTweets((prevTweets) => {
      const newTweets = [...prevTweets];
      const index = prevTweets.findIndex(
        (tweet) => tweet.id === tweetToUpdate.id,
      );
      newTweets[index] = tweetToUpdate;
      return newTweets;
    });
  }

  function removeTweetFromFeed(tweetToRemove: TweetwithMetadata) {
    setTweets((prevTweets) => {
      // Remove tweetToRemove from previous tweets
      const index = prevTweets.findIndex(
        (tweet) => tweet.id === tweetToRemove.id,
      );
      const newTweets = [
        ...prevTweets.slice(0, index),
        ...prevTweets.slice(index + 1),
      ];

      // Check if tweetToRemove has parent tweet in feed, and decrease the parent tweet replies by one
      if (tweetToRemove.reply_to_id) {
        const parentIndex = newTweets.findIndex(
          (tweet) => tweet.id === tweetToRemove.reply_to_id,
        );
        if (parentIndex !== -1 && newTweets[parentIndex].replies > 0) {
          newTweets[parentIndex].replies = newTweets[parentIndex].replies - 1;
        }
      }
      return newTweets;
    });
  }

  function handleShowMore(tweet: TweetwithMetadata) {
    router.push(`/explore/${tweet.author.username}/${tweet.id}`);
  }

  async function handleCopyUrl(tweet: TweetwithMetadata) {
    const tweetUrl = `${getBaseUrl()}explore/${tweet.author.username}/${
      tweet.id
    }`;
    await navigator.clipboard.writeText(tweetUrl);
  }

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

  async function handleBookmark(
    tweet: TweetwithMetadata,
    updateTweetInFeed: (newTweet: TweetwithMetadata) => void,
  ) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
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

  async function handleDelete(tweet: TweetwithMetadata) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await supabase
        .from("tweets")
        .delete()
        .match({ profile_id: user.id, id: tweet.id });
      if (pathname === `/explore/${tweet.author.username}/${tweet.id}`) {
        router.push("/");
      } else {
        removeTweetFromFeed(tweet);
      }
    }
  }

  function handleRefreshFeed() {
    window.scrollTo(0, 0);
    fetchTweets();
  }

  return {
    type,
    tweets,
    isLoading,
    addTweetToFeed,
    updateTweetInFeed,
    handleLike,
    handleBookmark,
    handleShowMore,
    handleCopyUrl,
    handleDelete,
    handleRefreshFeed,
  };
}
