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
          <Button
            onClick={handleCopyUrl}
            className="hover:bg-yellow-400/20 hover:text-yellow-400"
            size="icon"
            variant="transparent"
          >
            <FiLink size={18} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Copy URL</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
