import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { defaultMetadata } from "@/lib/constants";
import AuthProvider from "@/components/providers/auth-provider";

const inter = Inter({ subsets: ["latin"] });
export const metadata = defaultMetadata;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="h-full w-full bg-gray-900 text-gray-50">
          <AuthProvider>{children}</AuthProvider>
        </div>
      </body>
    </html>
  );
}
