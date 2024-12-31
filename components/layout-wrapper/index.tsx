import React, { ReactNode } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
const TopNav = dynamic(() => import("@/module/top-nav"));

const LayoutWrapper = ({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <main className={cn("w-full p-3 xxs:p-6 h-screen", className)}>
      <TopNav />
      {children}
    </main>
  );
};

export default LayoutWrapper;
