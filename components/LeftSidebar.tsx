"use client";

import { BiHomeCircle, BiUser } from "react-icons/bi";
import { HiOutlineHashtag } from "react-icons/hi";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { BsBell, BsBookmark, BsThreeDots, BsTwitter } from "react-icons/bs";
import Link from "next/link";
import ProfilePhoto from "./ProfilePhoto";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const navigationLinks = [
  { label: "Home", url: "/", icon: BiHomeCircle },
  { label: "Explore", url: "/explore", icon: HiOutlineHashtag },
  { label: "Notifications", url: "/notifications", icon: BsBell },
  { label: "Messages", url: "/messages", icon: HiOutlineEnvelope },
  { label: "Bookmarks", url: "/bookmarks", icon: BsBookmark },
  { label: "Profile", url: "/profile", icon: BiUser },
];

export default function LeftSidebar({ profile }: { profile: Profile | null }) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <nav className="sticky top-0 left-0 h-screen xl:min-w-[300px] flex flex-col justify-between items-end p-8">
      <div className="flex flex-col gap-2 text-xl w-full">
        <Link
          href="/"
          className="hover:bg-gray-800 w-fit rounded-full p-4 ml-1"
        >
          <BsTwitter />
        </Link>
        {navigationLinks.map((link) => (
          <Link
            key={link.label}
            className="hover:bg-gray-800 flex items-center justify-start w-fit gap-4 rounded-full py-3 px-5"
            href={link.url}
          >
            <link.icon size={24} />
            <p>{link.label}</p>
          </Link>
        ))}
      </div>
      <button className="w-full rounded-full py-3 bg-primary text-xl font-semibold text-center hover:bg-opacity-70">
        Tweet
      </button>
      <button
        onClick={handleSignOut}
        className="w-full p-3 rounded-full flex justify-between items-center gap-3 hover:bg-gray-800"
      >
        <div className="flex gap-2">
          <ProfilePhoto src={profile?.avatar_url} />
          <div className="text-left text-sm overflow-hidden">
            <div className="font-semibold truncate">{profile?.full_name}</div>
            <div className="text-gray-400 truncate">@{profile?.username}</div>
          </div>
        </div>
        <div className="pr-1">
          <BsThreeDots size={18} />
        </div>
      </button>
    </nav>
  );
}
