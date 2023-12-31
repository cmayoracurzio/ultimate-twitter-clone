import type { Metadata } from "next";
import { getBaseUrl } from "@/lib/utils/getBaseUrl";

// Url to GitHub repository with project code
export const GITHUB_REPO_URL =
  "https://github.com/cmayoracurzio/ultimate-twitter-clone";

// Maximum number of characters shown in tweet card
export const maxTweetCardTextLength = 400;

// Metadata
export const defaultMetadata: Metadata = {
  title: "Ultimate Twitter Clone",
  description:
    "Ultimate Twitter clone built with TypeScript, Next.js 13, Tailwind CSS and Supabase.",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",
  keywords: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"],
  authors: [{ name: "Carlos Mayora Curzio", url: GITHUB_REPO_URL }],
  colorScheme: "light",
  metadataBase: new URL(getBaseUrl()),
  openGraph: {
    title: "Ultimate Twitter Clone",
    description:
      "Ultimate Twitter clone built with TypeScript, Next.js 13, Tailwind CSS and Supabase.",
    siteName: "Ultimate Twitter Clone",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};
