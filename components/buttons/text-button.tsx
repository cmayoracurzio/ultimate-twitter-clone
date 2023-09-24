"use client";

import { ButtonHTMLAttributes, useMemo } from "react";

export enum TextButtonVariant {
  Primary = "primary",
  Destructive = "destructive",
  Light = "light",
  Large = "large",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: TextButtonVariant;
}

export default function TextButton({
  variant,
  className,
  ...props
}: ButtonProps) {
  const defaultClassNames =
    "w-full rounded-full px-5 py-2 text-center font-semibold";

  const allClassNames = useMemo(() => {
    let variantClassNames;
    switch (variant) {
      case TextButtonVariant.Primary:
        variantClassNames =
          "bg-primary hover:bg-opacity-70 disabled:bg-opacity-70";
        break;
      case TextButtonVariant.Destructive:
        variantClassNames = "bg-red-500 hover:bg-red-600 disabled:bg-red-600";
        break;
      case TextButtonVariant.Light:
        variantClassNames =
          "bg-gray-50 hover:bg-gray-200 disabled:bg-gray-200 text-gray-900 text-lg";
        break;
      case TextButtonVariant.Large:
        variantClassNames =
          "bg-primary hover:bg-opacity-70 disabled:bg-opacity-70 text-xl py-3 px-3";
        break;
      default:
        variantClassNames =
          "bg-primary hover:bg-opacity-70 disabled:bg-opacity-70";
        break;
    }
    return `${defaultClassNames} ${variantClassNames} ${className || ""}`;
  }, [variant, className]);

  return <button {...props} className={allClassNames} />;
}
