"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProfile } from "@/components/providers/profile-provider";
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
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { HiOutlineEnvelope, HiEnvelope } from "react-icons/hi2";
import { BsTwitter } from "react-icons/bs";
import TooltipWrapper, { type TooltipSide } from "@/components/tooltip";

export default function NavigationLinks({
  tooltipSide,
}: {
  tooltipSide: TooltipSide;
}) {
  const pathname = usePathname();
  const { username } = useProfile();

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
      icon: FaRegBookmark,
      currentPathIcon: FaBookmark,
    },
    {
      label: "Profile",
      url: `/explore/${username}`,
      icon: BiUser,
      currentPathIcon: BiSolidUser,
    },
  ];

  return (
    <div className="flex items-center justify-evenly text-xl sm:flex-col sm:gap-2 xl:items-start">
      <Link
        href="/"
        className="w-fit rounded-full p-3 hover:bg-gray-800 max-sm:hidden xl:ml-2"
      >
        <BsTwitter />
      </Link>
      {navigationLinks.map((link) => {
        const IconComponent =
          link.url === pathname ? link.currentPathIcon : link.icon;
        return (
          <TooltipWrapper
            key={link.label}
            tooltipText={link.label}
            side={tooltipSide}
            classNames="xl:hidden"
          >
            <Link
              href={link.url}
              className="flex w-fit items-center justify-start gap-4 rounded-full p-3 sm:hover:bg-gray-800 xl:px-5"
            >
              <IconComponent size={24} />
              <p className="hidden xl:block">{link.label}</p>
            </Link>
          </TooltipWrapper>
        );
      })}
    </div>
  );
}
