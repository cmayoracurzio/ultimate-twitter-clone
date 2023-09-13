import { abbreviateDate } from "@/lib/utils/abbreviateDate";
import { abbreviateNumber } from "@/lib/utils/abbreviateNumber";
import ProfileAvatar from "../ProfileAvatar";
import { BiCalendar } from "react-icons/bi";
import ProfileOptionsButton from "./ProfileOptionsButton";

export default async function ProfileCard({
  profile,
}: {
  profile: ProfileWithMetadata;
}) {
  const stats = [
    { name: "tweets", count: profile.tweets },
    { name: "likes", count: profile.likes },
    { name: "replies", count: profile.replies },
    { name: "bookmarks", count: profile.bookmarks },
  ];

  return (
    <div className="p-4 flex flex-col gap-8">
      {/* Profile information */}
      <div className="flex gap-4 items-start justify-start">
        <ProfileAvatar src={profile.avatar_url} size={90} />
        <div className="w-32 flex-1 flex flex-col gap-1.5 overflow-hidden">
          <p className="text-2xl font-bold truncate">{profile.full_name}</p>
          <p className="text-gray-500 truncate">@{profile.username}</p>
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            <BiCalendar />
            <p>Joined {abbreviateDate(profile.created_at)}</p>
          </div>
        </div>
        <ProfileOptionsButton profileId={profile.id} />
      </div>

      {/* Profile stats */}
      <div className="flex justify-start items-center gap-4 text-sm">
        {stats.map((stat) => (
          <div key={stat.name} className="flex-1">
            <span className="text-white font-bold">
              {abbreviateNumber(stat.count)}
            </span>
            <span className="ml-1.5 text-gray-500">{stat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
