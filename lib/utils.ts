import { clsx, type ClassValue } from "clsx";
import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

export type ThemeOption = "dark" | "light" | "rose" | "sky";
export interface ThemeSwitch {
  selectedOption: ThemeOption;
  option1: ThemeOption;
  option2: ThemeOption;
  setTheme: Dispatch<SetStateAction<string>>;
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toggleTheme({
  selectedOption,
  option1,
  option2,
  setTheme,
}: ThemeSwitch) {
  const newSelectedTheme = selectedOption === option1 ? option2 : option1;
  if (!document.startViewTransition) {
    setTheme(newSelectedTheme);
    return;
  }
  document.startViewTransition(() => {
    setTheme(newSelectedTheme);
  });
}
