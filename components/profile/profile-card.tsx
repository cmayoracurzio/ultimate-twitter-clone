"use client";

import { abbreviateDate } from "@/lib/utils/abbreviateDate";
import { abbreviateNumber } from "@/lib/utils/abbreviateNumber";
import { useProfile } from "../providers/profile-provider";
import Avatar from "../avatar";
import { BiCalendar } from "react-icons/bi";
import ProfileOptions from "./profile-options";

export default function ProfileCard({
  profile,
}: {
  profile: ProfileWithMetadata;
}) {
  const currentUserProfile = useProfile();

  const stats = [
    { name: "tweets", count: profile.tweets },
    { name: "likes", count: profile.likes },
    { name: "replies", count: profile.replies },
    { name: "bookmarks", count: profile.bookmarks },
  ];

  return (
    <div className="flex flex-col gap-8 p-4">
      {/* Profile information */}
      <div className="flex items-start justify-start gap-4">
        <Avatar src={profile.avatar_url} size={90} />
        <div className="flex w-32 flex-1 flex-col gap-1.5 overflow-hidden">
          <p className="truncate text-2xl font-bold">{profile.full_name}</p>
          <p className="truncate text-gray-500">@{profile.username}</p>
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <BiCalendar />
            <p>Joined {abbreviateDate(profile.created_at)}</p>
          </div>
        </div>
        {/* Profile options */}
        {currentUserProfile.id === profile.id ? (
          <ProfileOptions
            username={profile.username}
            fullName={profile.full_name}
          />
        ) : null}
      </div>

      {/* Profile stats */}
      <div className="flex items-center justify-start gap-4 text-sm">
        {stats.map((stat) => (
          <div key={stat.name} className="flex-1">
            <span className="font-bold text-white">
              {abbreviateNumber(stat.count)}
            </span>
            <span className="ml-1.5 text-gray-500">{stat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
