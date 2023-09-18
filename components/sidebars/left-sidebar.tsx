import NavigationLinks from "./navigation-links";
import ProfileButton from "./profile-button";
import TweetButton from "./tweet-button";

export default async function LeftSidebar() {
  return (
    <section className="max-sm:hidden sticky top-0 h-screen py-8 px-4 xl:px-8">
      <nav className="h-full flex flex-col justify-between items-center xl:items-start">
        <NavigationLinks />
        <TweetButton />
        <ProfileButton />
      </nav>
    </section>
  );
}
