"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
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
          <Button variant="ghost" size="icon" onClick={handleGoBack}>
            <FiArrowLeft size={24} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Back</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
