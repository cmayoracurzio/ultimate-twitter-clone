import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SupabaseProvider from "@/components/SupabaseProvider";

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
        <div className="w-full h-full bg-gray-900 text-white">
          <SupabaseProvider>{children}</SupabaseProvider>
        </div>
      </body>
    </html>
  );
}
