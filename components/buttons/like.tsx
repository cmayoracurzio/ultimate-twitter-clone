"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function Like({
  active,
  handleLike,
}: {
  active: boolean;
  handleLike: () => void;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="red"
            size="icon"
            onClick={handleLike}
            className={active ? "text-red-500 dark:text-red-500" : ""}
          >
            {active ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Like</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
