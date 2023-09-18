import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";

import AuthProvider from "@/components/providers/auth-provider";
import ProfileProvider from "@/components/providers/profile-provider";
import SidebarProvider from "@/components/providers/sidebar-provider";

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
        <div className="w-full h-full bg-gray-900 text-white">
          <AuthProvider>
            <ProfileProvider profile={profileData[0]}>
              <SidebarProvider>{children}</SidebarProvider>
            </ProfileProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
