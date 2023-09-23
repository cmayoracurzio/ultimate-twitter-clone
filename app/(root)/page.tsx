import Header from "@/components/header";
import HomeFeed from "@/components/feeds/home-feed";

export default async function Home() {
  return (
    <>
      <Header>Home</Header>
      <HomeFeed />
    </>
  );
}
