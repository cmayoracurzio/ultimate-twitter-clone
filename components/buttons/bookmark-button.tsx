"use client";

import { FaBookmark, FaRegBookmark } from "react-icons/fa";

export default function BookmarkButton({
  tweet,
  handleBookmark,
}: {
  tweet: TweetwithMetadata;
  handleBookmark: () => void;
}) {
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
