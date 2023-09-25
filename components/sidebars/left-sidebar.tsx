import NavigationLinks from "@/components/buttons/navigation-links";
import CreateTweet from "@/components/buttons/create-tweet";
import ShowOptions from "@/components/buttons/show-options";

export default function LeftSidebar() {
  return (
    <section className="sticky top-0 h-screen px-4 py-8 max-sm:hidden xl:px-8">
      <nav className="flex h-full flex-col items-center justify-between xl:items-start">
        <NavigationLinks tooltipSide="right" />
        <CreateTweet />
        <ShowOptions />
      </nav>
    </section>
  );
}
