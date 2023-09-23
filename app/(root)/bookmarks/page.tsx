import Header from "@/components/header";
import BookmarksFeed from "@/components/feeds/bookmarks-feed";

export default async function Page() {
  return (
    <>
      <Header>Bookmarks</Header>
      <BookmarksFeed />
    </>
  );
}
