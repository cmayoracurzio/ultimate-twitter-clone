import Header from "@/components/Header";
import TweetFeed from "@/components/TweetFeed";

export default async function Home() {
  return (
    <>
      <Header>Home</Header>
      <TweetFeed feedType="home" />
    </>
  );
}
