"use client";

import { useProfile } from "../AuthProvider";
import { BsThreeDots } from "react-icons/bs";
import ProfileAvatar from "../ProfileAvatar";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function ProfileButton() {
  const profile = useProfile();
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      className="xl:p-3 rounded-full flex justify-between items-center gap-3 hover:bg-gray-800"
    >
      <div className="flex gap-2">
        <ProfileAvatar src={profile.avatar_url} />
        <div className="text-left text-sm overflow-hidden max-xl:hidden">
          <div className="font-semibold truncate">{profile.full_name}</div>
          <div className="text-gray-400 truncate">@{profile.username}</div>
        </div>
      </div>
      <div className="max-xl:hidden">
        <BsThreeDots size={18} />
      </div>
    </button>
  );
}
