"use client";

import Link from "next/link";
import { formatAbsoluteDateTime } from "@/lib/utils/dates";
import LikeButton from "@/components/buttons/like-button";
import Avatar from "@/components/avatar";
import ReplyButton from "@/components/buttons/reply-button";
import BookmarkButton from "@/components/buttons/bookmark-button";
import ShareButton from "@/components/buttons/share-button";
import OptionsButton from "@/components/buttons/options-button";

export default function MainTweetCard({
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
    <article className="flex w-full flex-col justify-start gap-4 overflow-hidden p-4">
      {/* Tweet header */}
      <div className="flex items-center justify-start gap-4">
        <Avatar src={tweet.author.avatar_url} />

        <div className="flex flex-1 flex-col overflow-hidden text-gray-400">
          <Link
            href={`/explore/${tweet.author.username}`}
            className="truncate font-bold text-gray-50 hover:underline"
          >
            {tweet.author.full_name}
          </Link>
          <span className="truncate">@{tweet.author.username}</span>
        </div>
        <OptionsButton onClick={() => console.log("button clicked")} />
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
    </article>
  );
}
