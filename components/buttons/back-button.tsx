"use client";

import { useRouter } from "next/navigation";
import IconButton from "@/components/buttons/icon-button";

export default function BackButton() {
  const router = useRouter();

  function handleClick() {
    router.back();
  }

  return <IconButton onClick={handleClick} variant="back" />;
}
