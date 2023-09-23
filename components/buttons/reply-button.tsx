"use client";

import { FaRegComment } from "react-icons/fa6";
import { abbreviateNumber } from "@/lib/utils/numbers";

export default function ReplyButton({
  tweet,
  handleShowMore,
}: {
  tweet: TweetwithMetadata;
  handleShowMore: () => void;
}) {
  return (
    <button
      onClick={handleShowMore}
      className="group flex items-center gap-1 hover:text-green-400"
    >
      <div className="rounded-full p-2 group-hover:bg-green-400/20">
        <FaRegComment size={18} />
      </div>
      <p>{abbreviateNumber(tweet.replies)}</p>
    </button>
  );
}
