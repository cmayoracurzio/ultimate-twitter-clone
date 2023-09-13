import Header from "@/components/Header";
import TweetFeed from "@/components/TweetFeed";

export default async function Page() {
  return (
    <>
      <Header>Bookmarks</Header>
      <TweetFeed feedType="bookmarks" />
    </>
  );
}
