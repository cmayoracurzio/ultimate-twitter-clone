"use client";

import { formatProfileDateTime } from "@/lib/utils/date";
import { formatNumber } from "@/lib/utils/numbers";
import Avatar from "@/components/ui/avatar";
import { BiCalendar } from "react-icons/bi";
import Card from "@/components/ui/card";

export default function Profile({ profile }: { profile: ProfileWithMetadata }) {
  return (
    <Card className="flex flex-col gap-8">
      <div className="flex items-start justify-start gap-4 text-gray-400">
        <Avatar src={profile.avatar_url} size={90} priority={true} />
        <div className="flex flex-1 flex-col gap-1.5 overflow-hidden">
          <p className="truncate text-2xl font-bold tracking-tight text-gray-50">
            {profile.full_name}
          </p>
          <p className="truncate">@{profile.username}</p>
          <div className="flex items-center gap-1 text-sm ">
            <BiCalendar />
            <p>Joined {formatProfileDateTime(profile.created_at)}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-start gap-4 text-sm">
        {profile.stats.map((stat) => (
          <div key={stat.name} className="flex-1">
            <span className="font-bold">{formatNumber(stat.count)}</span>
            <span className="ml-1.5 text-gray-400">{stat.name}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
