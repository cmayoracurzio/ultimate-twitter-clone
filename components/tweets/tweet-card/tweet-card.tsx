"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { abbreviateDate } from "@/lib/utils/abbreviateDate";
import { truncateText } from "@/lib/utils/truncateText";

import LikeButton from "./like-button";
import Avatar from "../../avatar";
import TweetOptionsButton from "./tweet-options-button";
import ReplyButton from "./reply-button";
import BookmarkButton from "./bookmark-button";
import ShareButton from "./share-button";

const TweetCard = ({
  tweet,
  updateTweetInFeed,
  showOptions,
}: {
  tweet: TweetwithMetadata;
  updateTweetInFeed: (newTweet: TweetwithMetadata) => void;
  showOptions: boolean;
}) => {
  const maxTextLength = 400;
  const router = useRouter();

  const handleShowMore = () => {
    router.push(`/tweets/${tweet.id}`);
  };

  const abbreviatedDated = abbreviateDate(tweet.created_at);
  const truncatedText = truncateText(tweet.text, maxTextLength);

  return (
    <article className="flex items-start gap-4 p-4 text-sm text-gray-400 hover:bg-gray-800">
      {/* Tweet header */}
      <Avatar src={tweet.author.avatar_url} />
      <div className="flex w-full flex-col justify-start gap-1 overflow-hidden">
        <div className="flex items-center justify-start gap-4">
          <div className="flex w-32 flex-1 items-center gap-2 overflow-hidden text-gray-500">
            <Link
              href={`/profiles/${tweet.author.username}`}
              className="truncate font-bold text-white hover:underline"
            >
              {tweet.author.full_name}
            </Link>
            <span className="truncate">@{tweet.author.username}</span>
            <span>·</span>
            <span className="whitespace-nowrap">{abbreviatedDated}</span>
          </div>
          {showOptions ? <TweetOptionsButton /> : null}
        </div>

        {/* Tweet text */}
        <div className="mb-3 whitespace-break-spaces text-white">
          {tweet.text.length > maxTextLength ? (
            <>
              <span>{truncatedText}</span>
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
        <div className="flex items-center justify-between">
          <LikeButton tweet={tweet} updateTweetInFeed={updateTweetInFeed} />
          <ReplyButton tweet={tweet} handleShowMore={handleShowMore} />
          <BookmarkButton tweet={tweet} updateTweetInFeed={updateTweetInFeed} />
          <ShareButton tweet={tweet} />
        </div>
      </div>
    </article>
  );
};

export default TweetCard;
