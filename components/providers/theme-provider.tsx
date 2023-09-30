"use client";

import { useState, useEffect, createContext, useContext } from "react";

type ThemeContext = {
  darkMode: boolean | undefined;
  switchMode: () => void;
};

const Context = createContext<ThemeContext | undefined>(undefined);

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("darkMode", "true");
      document.documentElement.classList.add("dark");
    } else if (darkMode === false) {
      localStorage.setItem("darkMode", "false");
      document.documentElement.classList.remove("dark");
    } else {
      setDarkMode(localStorage.getItem("darkMode") === "true");
      setMounted(true);
    }
  }, [darkMode]);

  if (!mounted) {
    return null;
  }

  function switchMode() {
    setDarkMode(!darkMode);
  }

  return (
    <Context.Provider value={{ darkMode, switchMode }}>
      {children}
    </Context.Provider>
  );
}

export function useTheme() {
  let context = useContext(Context);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context as ThemeContext;
}
