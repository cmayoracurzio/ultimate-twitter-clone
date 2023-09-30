import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { defaultMetadata } from "@/lib/constants";
import AuthProvider from "@/components/providers/auth-provider";
import ThemeProvider from "@/components/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });
export const metadata = defaultMetadata;

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-50`}
      >
        <ThemeProvider>
          <AuthProvider>
            <div className="h-full w-full">{children}</div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
