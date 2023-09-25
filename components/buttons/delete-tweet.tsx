"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { BsXLg } from "react-icons/bs";

export default function Delete({ handleDelete }: { handleDelete: () => void }) {
  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button size="icon" variant="ghost">
                <BsXLg size={18} />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="bottom">Delete</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent onCloseAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Delete tweet</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this tweet and all of its replies?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogClose asChild>
          <Button width="full">Cancel</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button onClick={handleDelete} variant="destructive" width="full">
            Delete tweet
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
