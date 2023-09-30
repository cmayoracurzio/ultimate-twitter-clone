import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { notFound } from "next/navigation";
import Header from "@/components/cards/header";
import TweetFeed from "@/components/feeds/tweet-feed";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: { username: string; tweetId: string };
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  // Fetch user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  // Fetch tweet data
  const { data: tweetData } = await supabase
    .from("tweets")
    .select(
      "*, author: profiles(*), likes(profile_id), bookmarks(profile_id), replies: tweets!reply_to_id(profile_id)",
    )
    .eq("id", params.tweetId);

  if (!tweetData || tweetData.length === 0) {
    notFound();
  }

  // Format tweet data
  const tweet = tweetData.map((tweet) => ({
    ...tweet,
    author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
    replies: tweet.replies.length,
    likes: tweet.likes.length,
    createdByUser: tweet.author?.id === user.id,
    likedByUser: tweet.likes.some((like) => like.profile_id === user.id),
    bookmarkedByUser: tweet.bookmarks.some(
      (bookmark) => bookmark.profile_id === user.id,
    ),
  }))[0];

  return (
    <>
      <Header showGoBackButton>Tweet</Header>
      <TweetFeed initialTweet={tweet} />
    </>
  );
}
