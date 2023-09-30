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
  handleShowMore,
}: {
  handleShowMore: () => void;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="green" size="icon" onClick={handleShowMore}>
            <FaRegComment size={18} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Reply</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
