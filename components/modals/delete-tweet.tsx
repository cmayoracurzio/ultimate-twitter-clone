"use client";

import { useState } from "react";
import IconButton from "@/components/buttons/icon-button";
import BaseModal from "@/components/modals/base-modal";
import TextButton from "@/components/buttons/text-button";

export default function DeleteTweet({
  handleDelete,
}: {
  handleDelete: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function handleDeleteAndClose() {
    handleDelete();
    closeModal();
  }

  return (
    <>
      <IconButton onClick={openModal} variant="destructive" />
      <BaseModal title="Delete tweet" isOpen={isOpen} closeModal={closeModal}>
        <p>
          Are you sure you want to delete this tweet and all of its replies?
          This action cannot be undone.
        </p>
        <TextButton onClick={closeModal} variant="primary">
          Cancel
        </TextButton>
        <TextButton onClick={handleDeleteAndClose} variant="destructive">
          Delete tweet
        </TextButton>
      </BaseModal>
    </>
  );
}
