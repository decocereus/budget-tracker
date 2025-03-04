import React from "react";
import dynamic from "next/dynamic";
import Shimmer from "@/components/ui/shimmer/shimmer";
import Label from "@/components/ui/label/label";
import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button/button";
const ThemeToggle = dynamic(
  () => import("@/components/theme-toggle/theme-toggle"),
  {
    loading: () => <Shimmer />,
  }
);

async function TopNav() {
  const cookieStore = await cookies();
  const isLoggedIn = cookieStore.get("next-auth.session-token");

  const navOptions = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Login",
      url: "/login",
    },
    {
      title: "Register",
      url: "/register",
    },
    {
      title: "Dashboard",
      url: "/dashboard",
    },
  ];

  return (
    <nav className="w-full flex items-center justify-center">
      <div className="flex items-center justify-center border border-primary rounded-full py-2 self-center shadow-xl gap-x-12 w-full">
        {navOptions?.map((opt) => {
          if (opt.title === "Dashboard" && !!isLoggedIn === false) return;
          return (
            <Link href={opt.url} key={opt?.url}>
              <Button variant={"link"} asChild>
                <Label
                  intent={"body"}
                  weight={"medium"}
                  textTransform={"uppercase"}
                >
                  {opt?.title}
                </Label>
              </Button>
            </Link>
          );
        })}
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default TopNav;
