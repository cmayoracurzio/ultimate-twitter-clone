import Link from "next/link";
import abbreviateDate from "@/lib/utils/abbreviateDate";
import LikeButton from "./LikeButton";
import ProfilePhoto from "./ProfilePhoto";
import TweetOptionsButton from "./TweetOptionsButton";
import ReplyButton from "./ReplyButton";
import BookmarkButton from "./BookmarkButton";
import ShareButton from "./ShareButton";

const TweetCard = ({
  tweet,
  updateTweetInFeed,
}: {
  tweet: TweetwithMetadata;
  updateTweetInFeed: (newTweet: TweetwithMetadata) => void;
}) => {
  return (
    <article className="p-4 flex gap-4 items-start hover:bg-gray-800 text-gray-400 text-sm">
      <ProfilePhoto src={tweet.author.avatar_url} />
      <div className="w-full flex flex-col gap-1 justify-start overflow-hidden">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-500 overflow-hidden">
            <Link
              href={`/${tweet.author.username}`}
              className="text-white font-bold hover:underline truncate"
            >
              {tweet.author.full_name}
            </Link>
            <span className="truncate">@{tweet.author.username}</span>
            <span>·</span>
            <span>{abbreviateDate(tweet.created_at)}</span>
          </div>
          <TweetOptionsButton />
        </div>
        <div className="mb-3 whitespace-break-spaces text-white">
          {tweet.text}
        </div>
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <LikeButton tweet={tweet} updateTweetInFeed={updateTweetInFeed} />
          </div>
          <div className="flex-1">
            <ReplyButton tweet={tweet} />
          </div>
          <div className="flex-1">
            <BookmarkButton
              tweet={tweet}
              updateTweetInFeed={updateTweetInFeed}
            />
          </div>
          <ShareButton tweet={tweet} />
        </div>
      </div>
    </article>
  );
};

export default TweetCard;
