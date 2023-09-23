"use client";

import { abbreviateNumber } from "@/lib/utils/numbers";
import { FaHeart, FaRegHeart } from "react-icons/fa6";

export default function LikeButton({
  tweet,
  handleLike,
}: {
  tweet: TweetwithMetadata;
  handleLike: () => void;
}) {
  return (
    <button
      onClick={handleLike}
      className={`group flex items-center gap-1 hover:text-red-400 ${
        tweet.likedByUser && "text-red-400"
      }`}
    >
      <div className="rounded-full p-2 group-hover:bg-red-400/20">
        {tweet.likedByUser ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
      </div>
      <p>{abbreviateNumber(tweet.likes)}</p>
    </button>
  );
}
