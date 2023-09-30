"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { FiLink } from "react-icons/fi";

export default function Share({
  handleCopyUrl,
}: {
  handleCopyUrl: () => void;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="yellow" size="icon" onClick={handleCopyUrl}>
            <FiLink size={18} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Bookmark</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
