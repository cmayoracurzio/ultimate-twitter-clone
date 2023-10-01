import { formatProfileDateTime } from "@/lib/utils/date";
import { formatNumber } from "@/lib/utils/numbers";
import Avatar from "@/components/ui/avatar";
import { BiCalendar } from "react-icons/bi";
import ProfileOptions from "@/components/menus/profile-options";
import Follow from "@/components/buttons/follow";

export default function Profile({
  profile,
  showOptions,
}: {
  profile: ProfilewithMetadata;
  showOptions: boolean;
}) {
  return (
    <article className="space-y-6 p-4">
      <div className="flex items-start justify-start gap-4">
        <Avatar src={profile.avatar_url} size={90} alt={profile.username} />
        <div className="flex flex-1 flex-col justify-center gap-1.5 overflow-hidden">
          <h2 className="truncate text-2xl font-bold">{profile.full_name}</h2>
          <p className="truncate text-gray-500 dark:text-gray-400">
            @{profile.username}
          </p>
          <div className="flex items-center gap-1 text-sm text-gray-400 dark:text-gray-500">
            <BiCalendar />
            <p>Joined {formatProfileDateTime(profile.created_at)}</p>
          </div>
        </div>
        {showOptions ? (
          <ProfileOptions buttonSize="small" />
        ) : (
          <Follow
            profileId={profile.id}
            followedByUser={profile.followedByUser}
          />
        )}
      </div>
      <div className="grid grid-cols-3 gap-3 text-sm">
        {Object.entries(profile.stats).map(([key, value]) => (
          <div key={key}>
            <span className="font-bold">{formatNumber(value)}</span>
            <span className="ml-1.5 text-gray-500 dark:text-gray-400">
              {key}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}
