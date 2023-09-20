import Header from "@/components/header";
import TweetFeed from "@/components/tweet-feed";

export default async function Page() {
  return (
    <>
      <Header>Bookmarks</Header>
      <TweetFeed feedType="bookmarks" />
    </>
  );
}
