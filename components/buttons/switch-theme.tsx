"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { BsSun, BsMoon } from "react-icons/bs";

export default function SwitchTheme() {
  const { theme, setTheme } = useTheme();

  function switchMode() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <Button variant="ghost" size="icon" onClick={switchMode}>
      <div className="block dark:hidden">
        <BsSun size={18} />
      </div>
      <div className="hidden dark:block">
        <BsMoon size={18} />
      </div>
    </Button>
  );
}
