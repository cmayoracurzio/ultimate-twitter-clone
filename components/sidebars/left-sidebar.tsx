import ProfileOptions from "@/components/modals/profile-options";
import NavigationLinks from "@/components/buttons/navigation-links";
import TweetButton from "@/components/buttons/tweet-button";

export default function LeftSidebar() {
  return (
    <section className="sticky top-0 h-screen px-4 py-8 max-sm:hidden xl:px-8">
      <nav className="flex h-full flex-col items-center justify-between xl:items-start">
        <NavigationLinks />
        <TweetButton />
        <ProfileOptions buttonType="large" />
      </nav>
    </section>
  );
}
