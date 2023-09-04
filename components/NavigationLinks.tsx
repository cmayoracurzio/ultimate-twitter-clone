"use client";

import Link from "next/link";

import { BiHomeCircle, BiUser } from "react-icons/bi";
import { HiOutlineHashtag } from "react-icons/hi";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { BsTwitter, BsBell, BsBookmark } from "react-icons/bs";

const navigationLinks = [
  { label: "Home", url: "/", icon: BiHomeCircle },
  { label: "Explore", url: "/explore", icon: HiOutlineHashtag },
  { label: "Notifications", url: "/notifications", icon: BsBell },
  { label: "Messages", url: "/messages", icon: HiOutlineEnvelope },
  { label: "Bookmarks", url: "/bookmarks", icon: BsBookmark },
  { label: "Profile", url: "/profile", icon: BiUser },
];

export default function NavigationLinks() {
  return (
    <div className="w-full flex flex-col gap-2 items-center xl:items-start text-xl">
      <Link
        href="/"
        className="hover:bg-gray-800 w-fit rounded-full p-3 xl:ml-2"
      >
        <BsTwitter />
      </Link>
      {navigationLinks.map((link) => (
        <Link
          key={link.label}
          className="hover:bg-gray-800 flex items-center justify-start w-fit gap-4 rounded-full p-3 xl:px-5"
          href={link.url}
        >
          <link.icon size={24} />
          <p className="hidden xl:block">{link.label}</p>
        </Link>
      ))}
    </div>
  );
}
