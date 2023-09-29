"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { FaRegComment } from "react-icons/fa";

export default function Reply({
  formattedCount,
  handleShowMore,
}: {
  formattedCount: string;
  handleShowMore: () => void;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={handleShowMore} size="none" variant="greenText">
            <div className="rounded-full p-2 group-hover:bg-green-400/20">
              <FaRegComment size={18} />
            </div>
            <span>{formattedCount}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Reply</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
