import NavigationLinks from "@/components/buttons/navigation-links";
import NewTweet from "@/components/modals/new-tweet";
import ProfileOptions from "@/components/modals/profile-options";

export default function LeftSidebar() {
  return (
    <section className="sticky top-0 h-screen px-4 py-8 max-sm:hidden xl:px-8">
      <nav className="flex h-full flex-col items-center justify-between xl:items-start">
        <NavigationLinks tooltipPosition="right" />
        <NewTweet />
        <ProfileOptions />
      </nav>
    </section>
  );
}
