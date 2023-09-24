"use client";

import Link from "next/link";
import Avatar from "@/components/avatar";
import { useProfile } from "@/components/providers/profile-provider";
import { maxTweetCardTextLength } from "@/lib/constants";
import { formatRelativeDateTime } from "@/lib/utils/dates";
import { truncateText } from "@/lib/utils/text";
import { abbreviateNumber } from "@/lib/utils/numbers";
import DeleteTweet from "@/components/modals/delete-tweet";
import IconButton from "@/components/buttons/icon-button";

export default function TweetCard({
  tweet,
  handleLike,
  handleBookmark,
  handleShowMore,
  handleCopyUrl,
  handleDelete,
}: {
  tweet: TweetwithMetadata;
  handleLike: () => void;
  handleBookmark: () => void;
  handleShowMore: () => void;
  handleCopyUrl: () => void;
  handleDelete: () => void;
}) {
  const profile = useProfile();

  return (
    <article className="flex items-start gap-4 p-4 text-sm hover:bg-gray-800">
      {/* Tweet header */}
      <Avatar src={tweet.author.avatar_url} />
      <div className="-m-1 flex w-full flex-col justify-start gap-1 overflow-hidden p-1">
        <div className="flex items-center justify-start gap-4">
          <div className="-m-1 flex flex-1 items-center gap-2 overflow-hidden p-1 text-gray-400 ">
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
          {profile.id === tweet.author.id ? (
            <DeleteTweet handleDelete={handleDelete} />
          ) : null}
        </div>

        {/* Tweet text */}
        <div className="mb-2 whitespace-break-spaces">
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
            <IconButton
              variant="like"
              onClick={handleLike}
              active={tweet.likedByUser}
              count={abbreviateNumber(tweet.likes)}
            />
          </div>
          <div className="flex-1">
            <IconButton
              variant="reply"
              onClick={handleShowMore}
              count={abbreviateNumber(tweet.replies)}
            />
          </div>
          <div className="flex-1">
            <IconButton
              variant="bookmark"
              onClick={handleBookmark}
              active={tweet.bookmarkedByUser}
            />
          </div>
          <IconButton variant="share" onClick={handleCopyUrl} />
        </div>
      </div>
    </article>
  );
}
