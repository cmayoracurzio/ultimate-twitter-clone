import LeftSidebar from "@/components/sidebars/left-sidebar";
import RightSidebar from "@/components/sidebars/right-sidebar";
import BottomBar from "@/components/sidebars/bottom-bar";

export default async function SidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex justify-center max-w-6xl mx-auto">
        <LeftSidebar />
        <main className="w-full min-h-screen divide-y divide-gray-600 border-x-0 sm:border-x border-gray-600">
          {children}
        </main>
        <RightSidebar />
      </div>
      <BottomBar />
    </>
  );
}
