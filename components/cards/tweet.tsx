"use client";

import Link from "next/link";
import { truncateText } from "@/lib/utils/text";
import { maxTweetCardTextLength } from "@/lib/constants";
import { formatTweetDateTime } from "@/lib/utils/date";
import { formatNumber } from "@/lib/utils/numbers";
import Avatar from "@/components/ui/avatar";
import Delete from "@/components/buttons/delete";
import Like from "@/components/buttons/like";
import Reply from "@/components/buttons/reply";
import Bookmark from "@/components/buttons/bookmark";
import Share from "@/components/buttons/share";

export default function Tweet({
  tweet,
  mainTweet,
  handleLike,
  handleBookmark,
  handleShowMore,
  handleCopyUrl,
  handleDelete,
}: {
  tweet: TweetwithMetadata;
  mainTweet?: boolean;
  handleLike: () => void;
  handleBookmark: () => void;
  handleShowMore: () => void;
  handleCopyUrl: () => void;
  handleDelete: () => void;
}) {
  const formattedDateTime = formatTweetDateTime(tweet.created_at);
  const formattedLikes = formatNumber(tweet.likes);
  const formattedReplies = formatNumber(tweet.replies);

  // Format tweet text
  let formattedText;
  if (mainTweet) {
    formattedText = <span className="text-base">{tweet.text}</span>;
  } else if (tweet.text.length > maxTweetCardTextLength) {
    formattedText = (
      <span className="text-sm">
        {truncateText(tweet.text, maxTweetCardTextLength)}
        <span
          onClick={handleShowMore}
          className="cursor-pointer text-primary hover:underline"
        >
          Show more
        </span>
      </span>
    );
  } else {
    formattedText = <span className="text-sm">{tweet.text}</span>;
  }

  return (
    <article className="space-y-4 p-4">
      {/* Tweet header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center justify-start gap-2 overflow-hidden">
          <Avatar src={tweet.author.avatar_url} alt={tweet.author.username} />
          <div className="truncate">
            <Link
              href={`/explore/${tweet.author.username}`}
              className="truncate text-sm font-bold hover:underline"
            >
              {tweet.author.full_name}
            </Link>
            <p className="truncate text-sm text-gray-500 dark:text-gray-400">
              @{tweet.author.username}
            </p>
          </div>
        </div>
        {tweet.createdByUser ? (
          <div className="self-start text-gray-500 dark:text-gray-400">
            <Delete handleDelete={handleDelete} />
          </div>
        ) : null}
      </div>

      {/* Tweet text */}
      <p className="whitespace-break-spaces">{formattedText}</p>

      {/* Tweet creation date */}
      <p className="my-1 text-sm text-gray-400 dark:text-gray-500">
        {formattedDateTime}
      </p>

      {/* Tweet Buttons */}
      <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">
        <div className="flex flex-1 items-center gap-1">
          <Like active={tweet.likedByUser} handleLike={handleLike} />
          <span className="text-sm">{formattedLikes}</span>
        </div>
        <div className="flex flex-1 items-center gap-1">
          <Reply handleShowMore={handleShowMore} />
          <span className="text-sm">{formattedReplies}</span>
        </div>
        <div className="flex-1">
          <Bookmark
            active={tweet.bookmarkedByUser}
            handleBookmark={handleBookmark}
          />
        </div>
        <Share handleCopyUrl={handleCopyUrl} />
      </div>
    </article>
  );
}
