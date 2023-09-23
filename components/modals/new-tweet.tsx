"use client";

import { useState } from "react";
import { useProfile } from "@/components/providers/profile-provider";
import { useRouter } from "next/navigation";
import BaseModal from "@/components/modals/base-modal";
import TextButton from "@/components/buttons/text-button";
import IconButton from "@/components/buttons/icon-button";
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
      <div className="hidden w-full xl:block">
        <TextButton onClick={openModal} variant="large">
          Tweet
        </TextButton>
      </div>
      <div className="xl:hidden">
        <IconButton onClick={openModal} variant="tweet" />
      </div>
      <BaseModal title="New tweet" isOpen={isOpen} closeModal={closeModal}>
        <div className="flex items-start gap-4">
          <Avatar src={avatar_url} />
          <TweetForm addTweetToFeed={redirectToTweet} />
        </div>
      </BaseModal>
    </>
  );
}
