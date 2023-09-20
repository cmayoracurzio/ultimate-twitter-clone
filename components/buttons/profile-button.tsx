"use client";

import Avatar from "@/components/avatar";
import { BsThreeDots } from "react-icons/bs";

export default function ProfileButton({
  username,
  fullName,
  avatarUrl,
  onClick,
}: {
  username: string;
  fullName: string;
  avatarUrl: string | null;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between gap-3 rounded-full hover:bg-gray-800 xl:p-3"
    >
      <div className="flex gap-2">
        <Avatar src={avatarUrl} />
        <div className="overflow-hidden text-left text-sm max-xl:hidden">
          <div className="truncate font-semibold">{fullName}</div>
          <div className="truncate text-gray-400">@{username}</div>
        </div>
      </div>
      <div className="max-xl:hidden">
        <BsThreeDots size={18} />
      </div>
    </button>
  );
}
