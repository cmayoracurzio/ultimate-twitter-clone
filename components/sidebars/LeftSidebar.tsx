import NavigationLinks from "./NavigationLinks";
import ProfileButton from "./ProfileButton";
import TweetButton from "./TweetButton";

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
