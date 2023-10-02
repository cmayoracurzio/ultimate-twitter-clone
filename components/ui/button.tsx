import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "flex items-center justify-center gap-2 rounded-full disabled:pointer-events-none disabled:opacity-50 font-semibold",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-gray-50 border-primary hover:bg-primary/80 hover:border-primary/80 dark:bg-primary dark:border-primary dark:hover:bg-primary/80 dark:hover:border-primary/80",
        destructive:
          "bg-red-500 text-gray-50 hover:bg-red-600 dark:bg-red-500 dark:text-gray-50 dark:hover:bg-red-600",
        clear:
          "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300 border-gray-300 dark:border-gray-300",
        ghost:
          "hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50 text-gray-500 dark:text-gray-400 border-gray-400 dark:border-gray-400",
        blue: "hover:bg-primary/20 hover:text-primary dark:hover:bg-primary/200 dark:hover:text-primary text-gray-500 dark:text-gray-400",
        yellow:
          "hover:bg-yellow-500/20 hover:text-yellow-500 dark:hover:bg-yellow-500/20 dark:hover:text-yellow-500 text-gray-500 dark:text-gray-400",
        red: "hover:bg-red-500/20 hover:text-red-500 dark:hover:bg-red-500/20 dark:hover:text-red-500 text-gray-500 dark:text-gray-400 border-red-500 dark:border-red-500",
        green:
          "hover:bg-green-500/20 hover:text-green-500 dark:hover:bg-green-500/20 dark:hover:text-green-500 text-gray-500 dark:text-gray-400",
      },
      size: {
        default: "px-5 py-2 text-base",
        lg: "px-6 py-3 text-xl",
        icon: "p-2 text-sm",
      },
      width: {
        default: "w-fit",
        full: "w-full",
      },
      border: {
        default: "border",
        none: "border-none",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      width: "default",
      border: "none",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, width, border, asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, width, border, className }),
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
