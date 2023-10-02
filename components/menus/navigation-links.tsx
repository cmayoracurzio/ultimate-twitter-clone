"use client";

import Link from "next/link";
import { useProfile } from "@/components/providers/profile-provider";
import { usePathname } from "next/navigation";

import type { IconType } from "react-icons";
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

  function getLinkProperties(
    label: string,
    defaultIcon: IconType,
    activeIcon: IconType,
  ) {
    let url;
    if (label === "Home") {
      url = "/";
    } else if (label === "Profile") {
      url = `/explore/${username}`;
    } else {
      url = `/${label.toLowerCase()}`;
    }
    const isActive = pathname === url;
    return {
      label,
      url,
      icon: isActive ? activeIcon : defaultIcon,
      className: isActive ? "font-bold" : "font-normal",
    };
  }

  const navigationLinks = [
    getLinkProperties("Home", BiHomeCircle, BiSolidHomeCircle),
    getLinkProperties("Explore", BiSearch, BiSolidSearch),
    getLinkProperties("Notifications", BiBell, BiSolidBell),
    getLinkProperties("Messages", HiOutlineEnvelope, HiEnvelope),
    getLinkProperties("Bookmarks", GoBookmark, GoBookmarkFill),
    getLinkProperties("Profile", BiUser, BiSolidUser),
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
        return (
          <TooltipProvider key={link.label}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href={link.url}
                  className="flex items-center gap-4 rounded-full p-3 max-sm:text-gray-50 sm:hover:bg-gray-200 dark:sm:hover:bg-gray-800 xl:px-5"
                >
                  <link.icon size={24} />
                  <p className={`hidden xl:block ${link.className}`}>
                    {link.label}
                  </p>
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
