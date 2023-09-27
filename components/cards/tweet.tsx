"use client";

import Link from "next/link";
import { truncateText } from "@/lib/utils/text";
import { maxTweetCardTextLength } from "@/lib/constants";
import { formatTweetDateTime } from "@/lib/utils/date";
import { formatNumber } from "@/lib/utils/numbers";
import Card from "@/components/ui/card";
import Avatar from "@/components/ui/avatar";
import Delete from "@/components/buttons/delete-tweet";
import Like from "@/components/buttons/like-tweet";
import Reply from "@/components/buttons/reply-tweet";
import Bookmark from "@/components/buttons/bookmark-tweet";
import Share from "@/components/buttons/share-tweet";

export default function Tweet({
  tweet,
  mainTweet = false,
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
      <span>
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
    <Card className="space-y-4 text-sm">
      {/* Tweet header */}
      <div className="flex items-center justify-between gap-4">
        <div className="-m-1 flex items-start justify-start gap-3 overflow-hidden p-1">
          <Avatar src={tweet.author.avatar_url} alt={tweet.author.username} />
          <div className="-m-1 overflow-hidden p-1 text-gray-400">
            <Link
              href={`/explore/${tweet.author.username}`}
              className="truncate font-bold text-gray-50 hover:underline"
            >
              {tweet.author.full_name}
            </Link>
            <p className="truncate">@{tweet.author.username}</p>
          </div>
        </div>
        {tweet.createdByUser ? (
          <div className="self-start">
            <Delete handleDelete={handleDelete} />
          </div>
        ) : null}
      </div>

      {/* Tweet text */}
      <p className="whitespace-break-spaces">{formattedText}</p>

      {/* Tweet creation date */}
      <div className="my-1 text-gray-400">{formattedDateTime}</div>

      {/* Tweet Buttons */}
      <div className="flex items-center justify-between text-gray-400">
        <div className="flex-1">
          <Like
            active={tweet.likedByUser}
            handleLike={handleLike}
            formattedCount={formattedLikes}
          />
        </div>
        <div className="flex-1">
          <Reply
            handleReply={handleShowMore}
            formattedCount={formattedReplies}
          />
        </div>
        <div className="flex-1">
          <Bookmark
            active={tweet.bookmarkedByUser}
            handleBookmark={handleBookmark}
          />
        </div>
        <Share handleCopyUrl={handleCopyUrl} />
      </div>
    </Card>
  );
}
