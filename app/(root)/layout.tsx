import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import ProfileProvider from "@/components/providers/profile-provider";
import LeftSidebar from "@/components/sidebars/left-sidebar";
import RightSidebar from "@/components/sidebars/right-sidebar";
import BottomBar from "@/components/sidebars/bottom-bar";

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
    console.log("No user");
    redirect("/login");
  }

  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id);

  if (!profileData || profileData.length === 0) {
    console.log("No profile");
    await supabase.auth.signOut();
    redirect("/login");
  }

  return (
    <ProfileProvider profile={profileData[0]}>
      <div className="mx-auto flex w-full max-w-6xl justify-center">
        <LeftSidebar />
        <main className="min-h-screen w-full min-w-0 divide-y divide-gray-600 border-x-0 border-gray-600 sm:border-x">
          {children}
        </main>
        <RightSidebar />
      </div>
      <BottomBar />
    </ProfileProvider>
  );
}
