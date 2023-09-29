"use client";

import * as React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { BsThreeDots } from "react-icons/bs";
import Avatar from "@/components/ui/avatar";

const ShowOptionsSmall = React.forwardRef<HTMLButtonElement>(
  ({ ...props }, forwardedRef) => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button {...props} ref={forwardedRef} variant="ghost" size="icon">
              <BsThreeDots size={18} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">Options</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  },
);
ShowOptionsSmall.displayName = "ShowOptionsSmall";

const ShowOptionsLarge = React.forwardRef<
  HTMLButtonElement,
  { profile: Profile }
>(({ profile, ...props }, forwardedRef) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            {...props}
            ref={forwardedRef}
            variant="ghost"
            size="icon"
            width="full"
            className="max-xl:p-0"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <Avatar src={profile.avatar_url} alt={profile.username} />
              <div className="overflow-hidden text-left text-sm max-xl:hidden">
                <p className="truncate font-semibold text-gray-50">
                  {profile.full_name}
                </p>
                <p className="truncate text-gray-400">@{profile.username}</p>
              </div>
            </div>
            <div className="mr-1 max-xl:hidden">
              <BsThreeDots size={18} />
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" className="xl:hidden">
          Options
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
});
ShowOptionsLarge.displayName = "ShowOptionsLarge";

export { ShowOptionsSmall, ShowOptionsLarge };
