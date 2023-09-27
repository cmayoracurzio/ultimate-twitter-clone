import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import LeftSidebar from "@/components/menus/left-sidebar";
import RightSidebar from "@/components/menus/right-sidebar";

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
    <div className="mx-auto flex w-full max-w-6xl">
      <LeftSidebar profile={profile} />
      <main className="min-h-screen w-full min-w-0 divide-y divide-gray-600 border-x-0 border-gray-600 sm:border-x">
        {children}
      </main>
      <RightSidebar />
    </div>
  );
}
