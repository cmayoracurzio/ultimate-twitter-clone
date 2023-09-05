"use client";

import { abbreviateNumber } from "@/lib/utils/abbreviateNumber";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

export default function LikeButton({
  tweet,
  updateTweetInFeed,
}: {
  tweet: TweetwithMetadata;
  updateTweetInFeed: (newTweet: TweetwithMetadata) => void;
}) {
  const supabase = createClientComponentClient<Database>();

  const handleLike = async () => {
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
  };

  return (
    <div className="flex-1">
      <button
        onClick={handleLike}
        className={`flex items-center gap-1 group hover:text-red-400 ${
          tweet.likedByUser && "text-red-400"
        }`}
      >
        <div className="group-hover:bg-red-400/20 rounded-full p-2">
          {tweet.likedByUser ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
        </div>
        <p>{abbreviateNumber(tweet.likes)}</p>
      </button>
    </div>
  );
}
