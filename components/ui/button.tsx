import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "rounded-full flex items-center group gap-1 justify-center transition-colors disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-gray-50 hover:bg-primary/80",
        destructive: "bg-red-500 text-gray-50 hover:bg-red-600 ",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-100/80",
        ghost:
          "bg-transparent text-gray-400 hover:bg-gray-800 hover:text-gray-50",
        transparent: "bg-transparent text-gray-400",
      },
      size: {
        default: "px-5 py-2 font-semibold",
        lg: "text-xl py-3 px-6 font-semibold",
        icon: "p-2 font-normal",
      },
      width: {
        default: "w-fit",
        full: "w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      width: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, width, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, width, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
