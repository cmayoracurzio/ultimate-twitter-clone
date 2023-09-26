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
  formattedCount,
  handleLike,
}: {
  active: boolean;
  formattedCount: string;
  handleLike: () => void;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleLike}
            size="none"
            variant="redText"
            className={active ? "text-red-400" : ""}
          >
            <div className="rounded-full p-2 group-hover:bg-red-400/20">
              {active ? <FaHeart size={18} /> : <FaRegHeart size={18} />}
            </div>
            <span>{formattedCount}</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Like</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
