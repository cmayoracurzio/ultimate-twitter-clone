import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import TweetFeed from "@/components/TweetFeed";
import LeftSidebar from "@/components/sidebars/LeftSidebar";
import RightSidebar from "@/components/sidebars/RightSidebar";
import BottomBar from "@/components/sidebars/BottomBar";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  // Protect route from unauthenticated users
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch profile information
  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id);

  if (!profileData || !profileData[0].username) {
    redirect("/onboarding");
  }

  const profile = profileData[0];

  // Fetch tweets
  const { data: tweetData } = await supabase
    .from("tweets")
    .select(
      "*, author: profiles(*), likes(profile_id), bookmarks(profile_id), replies(*)"
    )
    .order("created_at", { ascending: false })
    .limit(20);

  const tweets =
    tweetData?.map((tweet) => ({
      ...tweet,
      author: Array.isArray(tweet.author) ? tweet.author[0] : tweet.author,
      replies: tweet.replies.length,
      likes: tweet.likes.length,
      likedByUser: tweet.likes.some((like) => like.profile_id === profile.id),
      bookmarkedByUser: tweet.bookmarks.some(
        (bookmark) => bookmark.profile_id === profile.id
      ),
    })) ?? [];

  return (
    <>
      <main className="flex justify-center max-w-6xl mx-auto divide-x-0 sm:divide-x divide-gray-600">
        <LeftSidebar profile={profile} />
        <section className="w-full min-h-screen">
          <h1 className="sticky top-0 text-2xl font-bold p-6 backdrop-blur border-b border-gray-600">
            Home
          </h1>
          <TweetFeed initialTweets={tweets} profile={profile} />
        </section>
        <RightSidebar />
      </main>
      <BottomBar profile={profile} />
    </>
  );
}
