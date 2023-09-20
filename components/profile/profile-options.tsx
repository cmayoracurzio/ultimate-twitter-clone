"use client";

import { BsThreeDots, BsX } from "react-icons/bs";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import EditProfileForm from "./edit-profile-form";
import DeleteAccountForm from "./delete-account-form";
import SignOut from "./sign-out";

export default function ProfileOptions({
  username,
  fullName,
}: {
  username: string;
  fullName: string;
}) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        onClick={openModal}
        className="rounded-full p-2 hover:bg-primary/20 hover:text-primary"
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
              <Dialog.Panel className="flex w-full max-w-md flex-col gap-4 rounded-2xl border border-gray-600 bg-gray-800 p-6 shadow-lg shadow-gray-600/50">
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
                    className="rounded-full bg-gray-700 p-1 hover:bg-gray-600"
                  >
                    <BsX size={24} className="text-white" />
                  </button>
                </div>
                {/* Edit profile form */}
                <div className="flex flex-col gap-4">
                  <h4 className="font-medium text-white">Sign out:</h4>
                  <SignOut />
                </div>
                {/* Edit profile form */}
                <div className="flex flex-col gap-4">
                  <h4 className="font-medium text-white">Edit profile:</h4>
                  <EditProfileForm username={username} fullName={fullName} />
                </div>
                {/* Delete account form */}
                <div className="flex flex-col gap-4">
                  <h4 className="font-medium text-white">Delete account:</h4>
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
