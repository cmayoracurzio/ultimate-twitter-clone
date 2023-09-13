"use client";

import { BsThreeDots } from "react-icons/bs";
import { useProfile } from "../AuthProvider";

export default function ProfileOptionsButton({
  profileId,
}: {
  profileId: string;
}) {
  const currentUserProfile = useProfile();

  // Don't show button if visited profile is not current user's profile
  if (currentUserProfile.id !== profileId) {
    return;
  }

  return (
    <button className="hover:bg-primary/20 hover:text-primary rounded-full p-2">
      <BsThreeDots size={18} />
    </button>
  );
}
