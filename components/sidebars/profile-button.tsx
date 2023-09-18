"use client";

import { useProfile } from "../providers/profile-provider";
import { BsThreeDots } from "react-icons/bs";
import Avatar from "../avatar";

export default function ProfileButton() {
  const profile = useProfile();

  return (
    <button className="flex items-center justify-between gap-3 rounded-full hover:bg-gray-800 xl:p-3">
      <div className="flex gap-2">
        <Avatar src={profile.avatar_url} />
        <div className="overflow-hidden text-left text-sm max-xl:hidden">
          <div className="truncate font-semibold">{profile.full_name}</div>
          <div className="truncate text-gray-400">@{profile.username}</div>
        </div>
      </div>
      <div className="max-xl:hidden">
        <BsThreeDots size={18} />
      </div>
    </button>
  );
}
