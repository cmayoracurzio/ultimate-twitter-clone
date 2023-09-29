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
          <Button onClick={handleCopyUrl} size="icon" variant="yellow">
            <FiLink size={18} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Copy URL</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
