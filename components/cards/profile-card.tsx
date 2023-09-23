"use client";

import { formatRelativeDateTime } from "@/lib/utils/dates";
import { abbreviateNumber } from "@/lib/utils/numbers";
import Avatar from "@/components/avatar";
import { BiCalendar } from "react-icons/bi";

export default function ProfileCard({
  profile,
}: {
  profile: ProfileWithMetadata;
}) {
  return (
    <div className="flex flex-col gap-8 p-4">
      {/* Profile information */}
      <div className="flex items-start justify-start gap-4 text-gray-400">
        <Avatar src={profile.avatar_url} size={90} priority={true} />
        <div className="flex flex-1 flex-col gap-1.5 overflow-hidden">
          <p className="truncate text-2xl font-bold text-gray-50">
            {profile.full_name}
          </p>
          <p className="truncate">@{profile.username}</p>
          <div className="flex items-center gap-1 text-sm ">
            <BiCalendar />
            <p>Joined {formatRelativeDateTime(profile.created_at)}</p>
          </div>
        </div>
      </div>

      {/* Profile stats */}
      <div className="flex items-center justify-start gap-4 text-sm">
        {profile.stats.map((stat) => (
          <div key={stat.name} className="flex-1">
            <span className="font-bold">{abbreviateNumber(stat.count)}</span>
            <span className="ml-1.5 text-gray-400">{stat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
