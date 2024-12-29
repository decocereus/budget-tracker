"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import { Moon, Sun, User } from "lucide-react";

const Switch = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & {
    selectedTheme?: string;
    themeSwitch?: boolean;
  }
>(
  (
    { className, themeSwitch = false, selectedTheme = "system", ...props },
    ref
  ) => {
    const themeIcon =
      selectedTheme === "light" ? (
        <Moon className="h-4 w-4 text-zinc-800" />
      ) : (
        <Sun className="h-4 w-4 text-amber-500" />
      );
    return (
      <SwitchPrimitives.Root
        className={cn(
          "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          className,
          !themeSwitch &&
            "data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
          themeSwitch && "border border-red h-7 w-12 theme-toggle-switch"
        )}
        {...props}
        ref={ref}
      >
        {themeSwitch ? (
          <SwitchPrimitives.Thumb
            className={cn(
              "pointer-events-none flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0 theme-toggle-thumb"
            )}
          >
            {selectedTheme === "system" ? (
              <User className="h-4 w-4 text-zinc-800" size={24} />
            ) : (
              themeIcon
            )}
          </SwitchPrimitives.Thumb>
        ) : (
          <SwitchPrimitives.Thumb
            className={cn(
              "pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
            )}
          />
        )}
      </SwitchPrimitives.Root>
    );
  }
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export default Switch;
