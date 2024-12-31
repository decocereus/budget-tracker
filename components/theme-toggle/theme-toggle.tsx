"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import Switch from "../ui/switch/switch";
import { ThemeOption, toggleTheme } from "@/lib/utils";

const ThemeToggle = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    if (!isMounted) setIsMounted(true);
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <Switch
      id="theme-toggle"
      checked={theme === "dark"}
      themeSwitch={true}
      selectedTheme={resolvedTheme}
      onCheckedChange={() => {
        toggleTheme({
          selectedOption: theme as ThemeOption,
          option1: "dark",
          option2: "light",
          setTheme: setTheme,
        });
      }}
    />
  );
};

export default ThemeToggle;
