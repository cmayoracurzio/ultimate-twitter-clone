"use client";

import { useProfile } from "@/components/providers/profile-provider";
import { useFeed, FeedType } from "@/hooks/useFeed";
import Avatar from "@/components/avatar";
import TweetForm from "@/components/forms/tweet-form";
import Feed from "@/components/feeds/feed";

export default function HomeFeed() {
  const { avatar_url } = useProfile();
  const feed = useFeed({ type: FeedType.Home });

  return (
    <>
      <div className="flex items-start gap-4 p-4">
        <Avatar src={avatar_url} />
        <TweetForm addTweetToFeed={feed.addTweetToFeed} />
      </div>
      <Feed feed={feed} />
    </>
  );
}
