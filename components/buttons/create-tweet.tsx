"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
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
import { Button } from "@/components/ui/button";
import { FaFeatherAlt } from "react-icons/fa";
import CreateTweetForm from "@/components/forms/create-tweet";

export default function CreateTweet({ profile }: { profile: Profile }) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function showTweetPage(newTweet: TweetwithMetadata) {
    setIsOpen(false);
    router.push(`/explore/${newTweet.author.username}/${newTweet.id}`);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" width="full" className="hidden xl:block">
          Tweet
        </Button>
      </DialogTrigger>
      <TooltipProvider>
        <Tooltip>
          <DialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button className="p-3 xl:hidden">
                <FaFeatherAlt size={24} />
              </Button>
            </TooltipTrigger>
          </DialogTrigger>
          <TooltipContent side="right">Tweet</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent onCloseAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>New tweet</DialogTitle>
        </DialogHeader>
        <CreateTweetForm
          profile={profile}
          onFormSuccess={showTweetPage}
          className="-p-4"
        />
      </DialogContent>
    </Dialog>
  );
}
