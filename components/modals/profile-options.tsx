"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { useProfile } from "@/components/providers/profile-provider";

import { BsX } from "react-icons/bs";
import SignOut from "@/components/auth/sign-out";
import EditProfileForm from "@/components/forms/edit-profile-form";
import DeleteAccountForm from "@/components/forms/delete-account-form";
import ProfileOptionsButton from "@/components/buttons/profile-options-button";

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
      <ProfileOptionsButton
        username={username}
        fullName={full_name}
        avatarUrl={avatar_url}
        onClick={openModal}
      />
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
              isOpen && "sm:mr-[15px]"
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
              <Dialog.Panel className="flex w-full max-w-md flex-col gap-4 rounded-2xl border border-gray-600 bg-gray-800 p-6 text-gray-100 shadow-lg shadow-gray-600/50">
                {/* Modal header and close button */}
                <div className="flex items-center justify-between">
                  <Dialog.Title as="h3" className="text-xl font-semibold">
                    Account options
                  </Dialog.Title>
                  <button
                    onClick={closeModal}
                    className="rounded-full bg-gray-700 p-1 hover:bg-gray-600"
                  >
                    <BsX size={24} />
                  </button>
                </div>
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
