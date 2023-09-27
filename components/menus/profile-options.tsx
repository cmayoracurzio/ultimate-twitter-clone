"use client";

import { useState, startTransition } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  ShowOptionsSmall,
  ShowOptionsLarge,
} from "@/components/buttons/show-options";
import { Button } from "@/components/ui/button";
import SignOut from "@/components/buttons/sign-out";
import EditProfileForm from "@/components/forms/edit-profile";
import DeleteAccountForm from "@/components/forms/delete-account";

export default function ProfileOptions({
  profile,
  buttonSize,
}: {
  profile: Profile;
  buttonSize: "small" | "large";
}) {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);

  function preventAutoFocus(e: Event) {
    e.preventDefault();
  }

  function openEditProfile() {
    startTransition(() => {
      setIsEditProfileOpen(true);
      setIsDeleteAccountOpen(false);
    });
  }

  function openDeleteAccount() {
    startTransition(() => {
      setIsDeleteAccountOpen(true);
      setIsEditProfileOpen(false);
    });
  }

  function closeAll() {
    startTransition(() => {
      setIsEditProfileOpen(false);
      setIsDeleteAccountOpen(false);
    });
  }

  return (
    <>
      {/* Button with popover options */}
      <Popover>
        <PopoverTrigger asChild>
          {buttonSize === "small" ? (
            <ShowOptionsSmall />
          ) : (
            <ShowOptionsLarge profile={profile} />
          )}
        </PopoverTrigger>
        <PopoverContent
          side="right"
          sideOffset={24}
          onCloseAutoFocus={preventAutoFocus}
          className="space-y-4"
        >
          <PopoverClose asChild>
            <SignOut />
          </PopoverClose>
          <PopoverClose asChild>
            <Button width="full" onClick={openEditProfile}>
              Edit profile...
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button
              variant="destructive"
              width="full"
              onClick={openDeleteAccount}
            >
              Delete account...
            </Button>
          </PopoverClose>
        </PopoverContent>
      </Popover>

      {/* Edit profile dialog */}
      <Dialog open={isEditProfileOpen} onOpenChange={setIsEditProfileOpen}>
        <DialogContent
          onCloseAutoFocus={preventAutoFocus}
          onOpenAutoFocus={preventAutoFocus}
        >
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Update your username, full name and avatar here.
            </DialogDescription>
          </DialogHeader>
          <EditProfileForm
            username={profile.username}
            fullName={profile.full_name}
            onFormSuccess={closeAll}
          />
        </DialogContent>
      </Dialog>

      {/* Delete account dialog */}
      <Dialog open={isDeleteAccountOpen} onOpenChange={setIsDeleteAccountOpen}>
        <DialogContent
          onCloseAutoFocus={preventAutoFocus}
          onOpenAutoFocus={preventAutoFocus}
        >
          <DialogHeader>
            <DialogTitle>Delete account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account? This action will
              delete all your data, and cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DeleteAccountForm
            username={profile.username}
            onFormSuccess={closeAll}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
