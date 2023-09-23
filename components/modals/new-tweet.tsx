"use client";

import { useState } from "react";
import { useProfile } from "@/components/providers/profile-provider";
import { useRouter } from "next/navigation";

import TweetButton from "@/components/buttons/tweet-button";
import BaseModal from "@/components/modals/base-modal";
import Avatar from "@/components/avatar";
import TweetForm from "@/components/forms/tweet-form";

export default function NewTweet() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { avatar_url } = useProfile();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function redirectToTweet(newTweet: TweetwithMetadata) {
    closeModal();
    router.push(`/explore/${newTweet.author.username}/${newTweet.id}`);
  }

  return (
    <>
      <TweetButton onClick={openModal} />
      <BaseModal title="New tweet" isOpen={isOpen} closeModal={closeModal}>
        <div className="flex items-start gap-4">
          <Avatar src={avatar_url} />
          <TweetForm addTweetToFeed={redirectToTweet} />
        </div>
      </BaseModal>
    </>
  );
}
