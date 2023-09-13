"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useProfile } from "../AuthProvider";

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
    url: "/profiles",
    icon: BiUser,
    currentPathIcon: BiSolidUser,
  },
];

export default function NavigationLinks() {
  const pathname = usePathname();
  const { username } = useProfile();

  return (
    <div className="flex sm:flex-col items-start justify-evenly sm:gap-2 text-xl">
      <Link
        href="/"
        className="hover:bg-gray-800 w-fit rounded-full p-3 xl:ml-2 max-sm:hidden"
      >
        <BsTwitter />
      </Link>
      {navigationLinks.map((link) => (
        <Link
          key={link.label}
          href={link.label === "Profile" ? `${link.url}/${username}` : link.url}
          className="sm:hover:bg-gray-800 flex items-center justify-start w-fit gap-4 rounded-full p-3 xl:px-5"
        >
          {link.url === pathname || `${link.url}/${username}` === pathname ? (
            <link.currentPathIcon size={24} />
          ) : (
            <link.icon size={24} />
          )}
          <p className="hidden xl:block">{link.label}</p>
        </Link>
      ))}
    </div>
  );
}
