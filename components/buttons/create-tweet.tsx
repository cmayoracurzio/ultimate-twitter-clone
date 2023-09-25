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
import CreateTweet from "@/components/forms/create-tweet";

export default function Tweet() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  function redirectToTweet(newTweet: TweetwithMetadata) {
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
      <DialogTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="p-3 xl:hidden">
                <FaFeatherAlt size={24} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Tweet</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent onCloseAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>New tweet</DialogTitle>
        </DialogHeader>
        <CreateTweet onFormSuccess={redirectToTweet} className="-p-4" />
      </DialogContent>
    </Dialog>
  );
}
