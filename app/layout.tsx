import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SupabaseProvider from "@/components/SupabaseProvider";
import LeftSidebar from "@/components/LeftSidebar";
import RightSidebar from "@/components/RightSidebar";

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
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full bg-gray-900 text-white">
          <SupabaseProvider>
            <div className="flex justify-center mx-auto max-w-7xl divide-x-0 sm:divide-x divide-gray-600">
              <LeftSidebar />
              {children}
              <RightSidebar />
            </div>
          </SupabaseProvider>
        </div>
      </body>
    </html>
  );
}
