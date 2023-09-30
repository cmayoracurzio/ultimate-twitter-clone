import NavigationLinks from "@/components/menus/navigation-links";
import CreateTweet from "@/components/buttons/create-tweet";
import ProfileOptions from "@/components/menus/profile-options";

export default async function LeftSidebar() {
  return (
    <section className="sticky top-0 h-screen px-4 py-8 max-sm:hidden xl:px-8">
      <div className="flex h-full flex-col items-center justify-between xl:w-[210px] xl:items-start">
        <NavigationLinks />
        <CreateTweet />
        <ProfileOptions buttonSize="large" />
      </div>
    </section>
  );
}
