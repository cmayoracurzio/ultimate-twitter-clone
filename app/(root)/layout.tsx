import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

import AuthProvider from "@/components/AuthProvider";
import LeftSidebar from "@/components/sidebars/LeftSidebar";
import RightSidebar from "@/components/sidebars/RightSidebar";
import BottomBar from "@/components/sidebars/BottomBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ultimate Twitter Clone",
  description: "Ultimate Twitter clone bootstrapped with Next.js",
};

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

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider profile={profileData[0]}>
          <div className="w-full h-full bg-gray-900 text-white">
            <div className="flex justify-center max-w-6xl mx-auto">
              <LeftSidebar />
              <main className="w-full min-h-screen divide-y divide-gray-600 border-x-0 sm:border-x border-gray-600">
                {children}
              </main>
              <RightSidebar />
            </div>
            <BottomBar />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
