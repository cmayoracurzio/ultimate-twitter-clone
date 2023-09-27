import { formatProfileDateTime } from "@/lib/utils/date";
import { formatNumber } from "@/lib/utils/numbers";
import Avatar from "@/components/ui/avatar";
import { BiCalendar } from "react-icons/bi";
import Card from "@/components/ui/card";
import ProfileOptions from "@/components/menus/profile-options";

export default function Profile({
  profile,
  stats,
  showOptions,
}: {
  profile: Profile;
  stats: ProfileStats;
  showOptions: boolean;
}) {
  return (
    <Card className="space-y-8">
      <div className="flex items-start justify-start gap-4 text-gray-400">
        <Avatar src={profile.avatar_url} size={90} alt={profile.username} />
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
        {showOptions ? (
          <ProfileOptions profile={profile} buttonSize="small" />
        ) : null}
      </div>
      <div className="flex items-center justify-start gap-4 text-sm">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="flex-1">
            <span className="font-bold">{formatNumber(value)}</span>
            <span className="ml-1.5 text-gray-400">{key}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
