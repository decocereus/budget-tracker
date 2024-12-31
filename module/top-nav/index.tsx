import React from "react";
import dynamic from "next/dynamic";
import Shimmer from "@/components/ui/shimmer/shimmer";
import Label from "@/components/ui/label/label";
const ThemeToggle = dynamic(
  () => import("@/components/theme-toggle/theme-toggle"),
  {
    loading: () => <Shimmer />,
  }
);

const TopNav = () => {
  return (
    <nav className="w-full flex items-center justify-center">
      <div className="flex items-center justify-center border border-primary rounded-full py-2 self-center shadow-xl gap-x-12 w-1/2">
        <Label intent={"body"} weight={"medium"} textTransform={"uppercase"}>
          Home
        </Label>
        <Label intent={"body"} weight={"medium"} textTransform={"uppercase"}>
          Past
        </Label>
        <Label intent={"body"} weight={"medium"} textTransform={"uppercase"}>
          Test
        </Label>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default TopNav;
