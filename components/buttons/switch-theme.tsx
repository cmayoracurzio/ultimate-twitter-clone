"use client";

import { BsSun, BsMoon } from "react-icons/bs";
import { useTheme } from "../providers/theme-provider";
import { Button } from "@/components/ui/button";

export default function SwitchTheme() {
  const { darkMode, switchMode } = useTheme();

  return (
    <Button variant="ghost" size="icon" onClick={switchMode}>
      {darkMode ? <BsMoon size={18} /> : <BsSun size={18} />}
    </Button>
  );
}
