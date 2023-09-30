import NavigationLinks from "@/components/menus/navigation-links";

export default async function BottomBar() {
  return (
    <div className="fixed bottom-0 z-10 w-full bg-primary p-4 sm:hidden">
      <NavigationLinks />
    </div>
  );
}
