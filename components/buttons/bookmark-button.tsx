"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

export default function BookmarkButton({
  tweet,
  updateTweetInFeed,
}: {
  tweet: TweetwithMetadata;
  updateTweetInFeed: (newTweet: TweetwithMetadata) => void;
}) {
  const supabase = createClientComponentClient<Database>();

  async function handleBookmark() {
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

  return (
    <button
      onClick={handleBookmark}
      className={`group flex items-center gap-1 hover:text-primary ${
        tweet.bookmarkedByUser && "text-primary"
      }`}
    >
      <div className="rounded-full p-2 group-hover:bg-primary/20">
        {tweet.bookmarkedByUser ? (
          <FaBookmark size={18} />
        ) : (
          <FaRegBookmark size={18} />
        )}
      </div>
    </button>
  );
}
