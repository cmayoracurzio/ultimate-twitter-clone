import Header from "@/components/header";
import TweetFeed from "@/components/tweet-feed";

export default async function Home() {
  return (
    <>
      <Header>Home</Header>
      <TweetFeed feedType="home" />
    </>
  );
}
