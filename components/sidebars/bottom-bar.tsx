import NavigationLinks from "@/components/buttons/navigation-links";

export default async function BottomBar() {
  return (
    <section className="fixed bottom-0 z-10 w-full bg-primary p-4 sm:hidden">
      <NavigationLinks />
    </section>
  );
}
