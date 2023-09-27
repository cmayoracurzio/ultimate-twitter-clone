"use client";

import { useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { FiArrowLeft } from "react-icons/fi";

export default function GoBack() {
  const router = useRouter();

  function handleGoBack() {
    router.back();
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button onClick={handleGoBack} variant="ghost" size="icon">
            <FiArrowLeft size={24} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Back</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
