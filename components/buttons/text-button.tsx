"use client";

import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: "primary" | "destructive" | "light" | "large";
};

export default function TextButton({ variant, ...props }: ButtonProps) {
  const defaultClassNames =
    "w-full rounded-full px-5 py-2 text-center font-semibold";
  let allClassNames;
  if (variant === "primary") {
    allClassNames = `${defaultClassNames} bg-primary hover:bg-opacity-70 disabled:bg-opacity-70`;
  } else if (variant === "destructive") {
    allClassNames = `${defaultClassNames} bg-red-500 hover:bg-red-600 disabled:bg-red-600`;
  } else if (variant === "light") {
    allClassNames = `${defaultClassNames} bg-gray-50 hover:bg-gray-200 disabled:bg-gray-200 text-black text-lg`;
  } else if (variant === "large") {
    allClassNames = `${defaultClassNames} bg-primary hover:bg-opacity-70 disabled:bg-opacity-70 text-xl py-3 px-3`;
  }

  return <button {...props} className={allClassNames} />;
}
