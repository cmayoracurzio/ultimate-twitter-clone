"use client";

import { FaRegComment } from "react-icons/fa6";
import { abbreviateNumber } from "@/lib/utils/abbreviateNumber";

export default function ReplyButton({
  tweet,
  handleShowMore,
}: {
  tweet: TweetwithMetadata;
  handleShowMore: () => void;
}) {
  return (
    <div className="flex-1">
      <button
        onClick={handleShowMore}
        className="flex items-center gap-1 group hover:text-green-400"
      >
        <div className="group-hover:bg-green-400/20 rounded-full p-2">
          <FaRegComment size={18} />
        </div>
        <p>{abbreviateNumber(tweet.replies)}</p>
      </button>
    </div>
  );
}
