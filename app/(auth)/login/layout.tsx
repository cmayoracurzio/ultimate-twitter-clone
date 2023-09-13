import "../../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ultimate Twitter Clone",
  description: "Ultimate Twitter clone bootstrapped with Next.js",
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="w-full h-full bg-gray-900 text-white">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
