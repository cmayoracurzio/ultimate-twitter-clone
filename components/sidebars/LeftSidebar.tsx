import NavigationLinks from "./NavigationLinks";
import ProfileButton from "./ProfileButton";
import TweetButton from "./TweetButton";

export default async function LeftSidebar({
  profile,
}: {
  profile: Profile | null;
}) {
  return (
    <section className="max-sm:hidden sticky top-0 h-screen max-w-[300px] py-8 px-4 xl:px-8">
      <nav className="h-full flex flex-col justify-between items-center">
        <NavigationLinks />
        <TweetButton />
        <ProfileButton profile={profile} />
      </nav>
    </section>
  );
}
