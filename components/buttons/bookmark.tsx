"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

export default function Bookmark({
  active,
  handleBookmark,
}: {
  active: boolean;
  handleBookmark: () => void;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="blue"
            size="icon"
            onClick={handleBookmark}
            className={active ? "text-primary dark:text-primary" : ""}
          >
            {active ? <FaBookmark size={18} /> : <FaRegBookmark size={18} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Bookmark</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
