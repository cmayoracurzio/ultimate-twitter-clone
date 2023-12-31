import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import ProfileProvider from "@/components/providers/profile-provider";
import LeftSidebar from "@/components/menus/left-sidebar";
import RightSidebar from "@/components/menus/right-sidebar";
import BottomBar from "@/components/menus/bottom-bar";

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id);

  if (!profileData || profileData.length === 0) {
    await supabase.auth.signOut();
    redirect("/login");
  }

  const profile = profileData[0];

  return (
    <ProfileProvider profile={profile}>
      <div className="mx-auto flex max-w-6xl">
        <LeftSidebar />
        <section className="min-h-screen w-full min-w-0 divide-y divide-gray-300 border-x-0 border-gray-300 dark:divide-gray-600 dark:border-gray-600 sm:border-x">
          {children}
        </section>
        <RightSidebar />
        <BottomBar />
      </div>
    </ProfileProvider>
  );
}
