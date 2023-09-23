"use client";

import Link from "next/link";
import { maxTweetCardTextLength } from "@/lib/constants";
import { formatRelativeDateTime } from "@/lib/utils/dates";
import { truncateText } from "@/lib/utils/text";

import LikeButton from "@/components/buttons/like-button";
import Avatar from "@/components/avatar";
import ReplyButton from "@/components/buttons/reply-button";
import BookmarkButton from "@/components/buttons/bookmark-button";
import ShareButton from "@/components/buttons/share-button";
import OptionsButton from "@/components/buttons/options-button";

export default function TweetCard({
  tweet,
  handleLike,
  handleBookmark,
  handleShowMore,
  handleCopyLink,
}: {
  tweet: TweetwithMetadata;
  handleLike: () => void;
  handleBookmark: () => void;
  handleShowMore: () => void;
  handleCopyLink: () => void;
}) {
  return (
    <article className="flex items-start gap-4 p-4 text-sm hover:bg-gray-800">
      {/* Tweet header */}
      <Avatar src={tweet.author.avatar_url} />
      <div className="flex w-full flex-col justify-start gap-1 overflow-hidden">
        <div className="flex items-center justify-start gap-4">
          <div className="flex flex-1 items-center gap-2 overflow-hidden text-gray-400">
            <Link
              href={`/explore/${tweet.author.username}`}
              className="truncate font-bold text-gray-50 hover:underline"
            >
              {tweet.author.full_name}
            </Link>
            <span className="truncate">@{tweet.author.username}</span>
            <span>·</span>
            <span className="whitespace-nowrap">
              {formatRelativeDateTime(tweet.created_at)}
            </span>
          </div>
          <OptionsButton onClick={() => console.log("button clicked")} />
        </div>

        {/* Tweet text */}
        <div className="mb-3 whitespace-break-spaces">
          {tweet.text.length > maxTweetCardTextLength ? (
            <>
              <span>{truncateText(tweet.text, maxTweetCardTextLength)}</span>
              <span
                onClick={handleShowMore}
                className="cursor-pointer text-primary hover:underline"
              >
                Show more
              </span>
            </>
          ) : (
            <span>{tweet.text}</span>
          )}
        </div>

        {/* Tweet Buttons */}
        <div className="flex items-center justify-between text-gray-400">
          <div className="flex-1">
            <LikeButton tweet={tweet} handleLike={handleLike} />
          </div>
          <div className="flex-1">
            <ReplyButton
              replies={tweet.replies}
              handleShowMore={handleShowMore}
            />
          </div>
          <div className="flex-1">
            <BookmarkButton tweet={tweet} handleBookmark={handleBookmark} />
          </div>
          <ShareButton handleCopyLink={handleCopyLink} />
        </div>
      </div>
    </article>
  );
}
