import NavigationLinks from "@/components/buttons/navigation-links";
import CreateTweet from "@/components/buttons/create-tweet";
import ProfileOptions from "@/components/menus/profile-options";

export default async function LeftSidebar({ profile }: { profile: Profile }) {
  return (
    <>
      <section className="sticky top-0 h-screen px-4 py-8 max-sm:hidden xl:px-8">
        <nav className="flex h-full flex-col items-center justify-between xl:items-start">
          <NavigationLinks tooltipSide="right" username={profile.username} />
          <CreateTweet profile={profile} />
          <ProfileOptions profile={profile} buttonSize="large" />
        </nav>
      </section>

      {/* Mobile sidebar */}
      <section className="fixed bottom-0 z-10 w-full bg-primary p-4 sm:hidden">
        <NavigationLinks username={profile.username} tooltipSide="top" />
      </section>
    </>
  );
}
