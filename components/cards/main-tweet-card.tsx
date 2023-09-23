"use client";

import Link from "next/link";
import { useProfile } from "@/components/providers/profile-provider";
import Avatar from "@/components/avatar";
import { abbreviateNumber } from "@/lib/utils/numbers";
import { formatAbsoluteDateTime } from "@/lib/utils/dates";
import DeleteTweet from "@/components/modals/delete-tweet";
import IconButton from "@/components/buttons/icon-button";

export default function MainTweetCard({
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
    <article className="flex w-full flex-col justify-start gap-4 overflow-hidden p-4">
      {/* Tweet header */}
      <div className="flex items-center justify-between gap-4">
        <div className="-m-1 flex items-center justify-start gap-4 overflow-hidden p-1">
          <Avatar src={tweet.author.avatar_url} />
          <div className="-m-1 flex flex-col overflow-hidden p-1 text-gray-400">
            <Link
              href={`/explore/${tweet.author.username}`}
              className="truncate font-bold text-gray-50 hover:underline"
            >
              {tweet.author.full_name}
            </Link>
            <span className="truncate">@{tweet.author.username}</span>
          </div>
        </div>
        {profile.id === tweet.author.id ? (
          <div className="self-start">
            <DeleteTweet handleDelete={handleDelete} />
          </div>
        ) : null}
      </div>

      {/* Tweet text */}
      <div className="whitespace-break-spaces text-base">{tweet.text}</div>

      {/* Tweet creation date */}
      <div className="my-1 text-sm text-gray-400">
        {formatAbsoluteDateTime(tweet.created_at)}
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
            active={tweet.bookmarkedByUser}
            onClick={handleBookmark}
          />
        </div>
        <IconButton onClick={handleCopyUrl} variant="share" />
      </div>
    </article>
  );
}
