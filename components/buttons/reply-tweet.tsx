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
  handleReply,
}: {
  formattedCount: string;
  handleReply: () => void;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleReply}
            className="p-0 hover:text-green-400"
            size="icon"
            variant="transparent"
          >
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
