"use client";

import { useState } from "react";
import IconButton, {
  IconButtonVariant,
} from "@/components/buttons/icon-button";
import Modal from "@/components/modals/modal";
import TextButton, {
  TextButtonVariant,
} from "@/components/buttons/text-button";

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
      <IconButton onClick={openModal} variant={IconButtonVariant.Delete} />
      <Modal title="Delete tweet" isOpen={isOpen} closeModal={closeModal}>
        <p>
          Are you sure you want to delete this tweet and all of its replies?
          This action cannot be undone.
        </p>
        <TextButton onClick={closeModal} variant={TextButtonVariant.Primary}>
          Cancel
        </TextButton>
        <TextButton
          onClick={handleDeleteAndClose}
          variant={TextButtonVariant.Destructive}
        >
          Delete tweet
        </TextButton>
      </Modal>
    </>
  );
}
