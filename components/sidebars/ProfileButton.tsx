"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

import { BsThreeDots } from "react-icons/bs";
import ProfilePhoto from "../shared/ProfilePhoto";

export default function ProfileButton({
  profile,
}: {
  profile: Profile | null;
}) {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <button
      onClick={handleSignOut}
      className="xl:p-3 rounded-full flex justify-between items-center gap-3 hover:bg-gray-800"
    >
      <div className="flex gap-2">
        <ProfilePhoto src={profile?.avatar_url} />
        <div className="text-left text-sm overflow-hidden max-xl:hidden">
          <div className="font-semibold truncate">{profile?.full_name}</div>
          <div className="text-gray-400 truncate">@{profile?.username}</div>
        </div>
      </div>
      <div className="pr-1 max-xl:hidden">
        <BsThreeDots size={18} />
      </div>
    </button>
  );
}
