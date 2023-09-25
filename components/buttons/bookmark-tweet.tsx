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
            onClick={handleBookmark}
            className={`hover:bg-primary/20 hover:text-primary ${
              active ? "text-primary" : ""
            }`}
            size="icon"
            variant="transparent"
          >
            {active ? <FaBookmark size={18} /> : <FaRegBookmark size={18} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Bookmark</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
