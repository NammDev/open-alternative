import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "appearance-none rounded-md border bg-background px-3 py-2 text-[13px]/tight font-medium text-secondary placeholder:text-inherit placeholder:opacity-50 hover:enabled:cursor-pointer hover:enabled:hover:border-border-dark hover:enabled:hover:bg-card disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
