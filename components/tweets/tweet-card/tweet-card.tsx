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
    <article className="p-4 flex gap-4 items-start hover:bg-gray-800 text-gray-400 text-sm">
      {/* Tweet header */}
      <Avatar src={tweet.author.avatar_url} />
      <div className="w-full flex flex-col gap-1 justify-start overflow-hidden">
        <div className="flex items-center justify-start gap-4">
          <div className="flex-1 flex items-center gap-2 text-gray-500 overflow-hidden">
            <Link
              href={`/profiles/${tweet.author.username}`}
              className="text-white font-bold hover:underline truncate"
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
                className="text-primary hover:underline cursor-pointer"
              >
                Show more
              </span>
            </>
          ) : (
            <span>{tweet.text}</span>
          )}
        </div>

        {/* Tweet Buttons */}
        <div className="flex justify-between items-center">
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
