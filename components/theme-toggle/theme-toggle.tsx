"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import Switch from "../ui/switch/switch";
import Label from "../ui/label/label";

const ThemeToggle = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    if (!isMounted) setIsMounted(true);
  }, [isMounted]);

  const toggleTheme = () => {
    if (!document.startViewTransition) {
      setTheme(theme === "dark" ? "light" : "dark");
      return;
    }

    document.startViewTransition(() => {
      const newTheme = theme === "dark" ? "light" : "dark";
      setTheme(newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
    });
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex items-center gap-x-2">
      <Switch
        id="theme-toggle"
        checked={theme === "dark"}
        themeSwitch={true}
        selectedTheme={resolvedTheme}
        onCheckedChange={toggleTheme}
      />
      <Label htmlFor="theme-toggle" className="capitalize">
        {resolvedTheme}
      </Label>
    </div>
  );
};

export default ThemeToggle;
