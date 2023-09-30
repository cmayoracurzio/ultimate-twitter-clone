"use client";

import Link from "next/link";
import { useProfile } from "@/components/providers/profile-provider";
import { usePathname } from "next/navigation";
import {
  BiHomeCircle,
  BiSolidHomeCircle,
  BiSearch,
  BiSolidSearch,
  BiBell,
  BiSolidBell,
  BiUser,
  BiSolidUser,
} from "react-icons/bi";
import { GoBookmark, GoBookmarkFill } from "react-icons/go";
import { HiOutlineEnvelope, HiEnvelope } from "react-icons/hi2";
import { BsTwitter } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function NavigationLinks() {
  const { username } = useProfile();
  const pathname = usePathname();

  const navigationLinks = [
    {
      label: "Home",
      url: "/",
      icon: BiHomeCircle,
      currentPathIcon: BiSolidHomeCircle,
    },
    {
      label: "Explore",
      url: "/explore",
      icon: BiSearch,
      currentPathIcon: BiSolidSearch,
    },
    {
      label: "Notifications",
      url: "/notifications",
      icon: BiBell,
      currentPathIcon: BiSolidBell,
    },
    {
      label: "Messages",
      url: "/messages",
      icon: HiOutlineEnvelope,
      currentPathIcon: HiEnvelope,
    },
    {
      label: "Bookmarks",
      url: "/bookmarks",
      icon: GoBookmark,
      currentPathIcon: GoBookmarkFill,
    },
    {
      label: "Profile",
      url: `/explore/${username}`,
      icon: BiUser,
      currentPathIcon: BiSolidUser,
    },
  ];

  return (
    <nav className="flex items-center justify-evenly text-xl sm:flex-col sm:gap-2 xl:items-start">
      <Link
        href="/"
        className="rounded-full p-3 hover:bg-gray-200 dark:hover:bg-gray-800 max-sm:hidden xl:ml-2"
      >
        <BsTwitter size={24} />
      </Link>
      {navigationLinks.map((link) => {
        const IconComponent =
          link.url === pathname ? link.currentPathIcon : link.icon;
        const labelClassName = `hidden xl:block ${
          link.url === pathname ? "font-bold" : "font-normal"
        }`;

        return (
          <TooltipProvider key={link.label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={link.url}
                  className="flex items-center gap-4 rounded-full p-3 max-sm:text-gray-50 sm:hover:bg-gray-200 dark:sm:hover:bg-gray-800 xl:px-5"
                >
                  <IconComponent size={24} />
                  <p className={labelClassName}>{link.label}</p>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-sm:hidden xl:hidden">
                {link.label}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      })}
    </nav>
  );
}
