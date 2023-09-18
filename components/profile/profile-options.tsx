"use client";

import { BsThreeDots, BsX } from "react-icons/bs";
import { useProfile } from "../providers/profile-provider";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import EditProfileForm from "./edit-profile-form";
import DeleteAccountForm from "./delete-account-form";
import SignOut from "./sign-out";

export default function ProfileOptions({ profileId }: { profileId: string }) {
  const currentUserProfile = useProfile();
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  if (!currentUserProfile || currentUserProfile.id !== profileId) {
    return null;
  }

  return (
    <>
      <button
        onClick={openModal}
        className="hover:bg-primary/20 hover:text-primary rounded-full p-2"
      >
        <BsThreeDots size={18} />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div
            className={`fixed inset-0 flex items-center justify-center p-4 ${
              isOpen && "mr-[15px]"
            }`}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md p-6 rounded-2xl bg-gray-800 border border-gray-600 shadow-lg shadow-gray-600/50 flex flex-col gap-4">
                {/* Modal header and close button */}
                <div className="flex items-center justify-between">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-semibold text-white"
                  >
                    Account options
                  </Dialog.Title>
                  <button
                    onClick={closeModal}
                    className="p-1 bg-gray-700 hover:bg-gray-600 rounded-full"
                  >
                    <BsX size={24} className="text-white" />
                  </button>
                </div>
                {/* Edit profile form */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-white font-medium">Sign out:</h4>
                  <SignOut />
                </div>
                {/* Edit profile form */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-white font-medium">Edit profile:</h4>
                  <EditProfileForm currentUserProfile={currentUserProfile} />
                </div>
                {/* Delete account form */}
                <div className="flex flex-col gap-4">
                  <h4 className="text-white font-medium">Delete account:</h4>
                  <DeleteAccountForm currentUserProfile={currentUserProfile} />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
