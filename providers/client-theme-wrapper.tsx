"use client";

import ThemeProvider from "@/providers/ThemeProvider";

export default function ClientThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      storageKey="theme"
      defaultTheme="system"
      enableSystem
      themes={["dark", "light", "rose", "sky"]}
    >
      {children}
    </ThemeProvider>
  );
}
