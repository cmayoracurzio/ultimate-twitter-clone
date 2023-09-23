"use client";

import { useState } from "react";
import { useProfile } from "@/components/providers/profile-provider";
import OptionsButton from "@/components/buttons/options-button";
import BaseModal from "@/components/modals/base-modal";
import SignOut from "@/components/auth/sign-out";
import EditProfileForm from "@/components/forms/edit-profile-form";
import DeleteAccountForm from "@/components/forms/delete-account-form";

export default function ProfileOptions() {
  const [isOpen, setIsOpen] = useState(false);
  const { username, full_name, avatar_url } = useProfile();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <OptionsButton
        username={username}
        fullName={full_name}
        avatarUrl={avatar_url}
        onClick={openModal}
      />
      <BaseModal
        title="Account options"
        isOpen={isOpen}
        closeModal={closeModal}
      >
        {/* Edit profile form */}
        <div className="flex flex-col gap-4">
          <h4 className="font-medium">Sign out:</h4>
          <SignOut />
        </div>
        {/* Edit profile form */}
        <div className="flex flex-col gap-4">
          <h4 className="font-medium">Edit profile:</h4>
          <EditProfileForm
            username={username}
            fullName={full_name}
            closeModal={closeModal}
          />
        </div>
        {/* Delete account form */}
        <div className="flex flex-col gap-4">
          <h4 className="font-medium">Delete account:</h4>
          <DeleteAccountForm username={username} />
        </div>
      </BaseModal>
    </>
  );
}
