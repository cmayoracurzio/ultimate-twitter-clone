"use client";

import { useState } from "react";
import { useProfile } from "@/components/providers/profile-provider";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Avatar from "@/components/ui/avatar";
import { BsThreeDots } from "react-icons/bs";
import SignOut from "@/components/buttons/sign-out";
import EditProfile from "@/components/forms/edit-profile";
import DeleteAccount from "@/components/forms/delete-account";

export default function ShowOptions() {
  const [isOpen, setIsOpen] = useState(false);
  const { username, full_name, avatar_url } = useProfile();

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="flex items-center justify-between gap-3 rounded-full hover:bg-gray-800 xl:p-3">
                  <div className="flex gap-2">
                    <Avatar src={avatar_url} />
                    <div className="overflow-hidden text-left text-sm max-xl:hidden">
                      <div className="truncate font-semibold">{full_name}</div>
                      <div className="truncate text-gray-400">@{username}</div>
                    </div>
                  </div>
                  <div className="text-gray-400 max-xl:hidden">
                    <BsThreeDots size={18} />
                  </div>
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" className="xl:hidden">
                Profile options
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </DialogTrigger>
      <DialogContent onCloseAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Account options</DialogTitle>
        </DialogHeader>
        {/* Sign out */}
        <div className="flex flex-col gap-4">
          <h4 className="font-medium text-gray-50">Sign out:</h4>
          <DialogClose asChild>
            <SignOut />
          </DialogClose>
        </div>
        {/* Edit profile form */}
        <div className="flex flex-col gap-4">
          <h4 className="font-medium text-gray-50">Edit profile:</h4>
          <EditProfile
            username={username}
            fullName={full_name}
            onFormSuccess={closeModal}
          />
        </div>
        {/* Delete account form */}
        <div className="flex flex-col gap-4">
          <h4 className="font-medium text-gray-50">Delete account:</h4>
          <DeleteAccount username={username} onFormSuccess={closeModal} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
