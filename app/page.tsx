import LayoutWrapper from "@/components/layout-wrapper";
import Shimmer from "@/components/ui/shimmer/shimmer";
import dynamic from "next/dynamic";
const ThemeToggle = dynamic(
  () => import("@/components/theme-toggle/theme-toggle"),
  {
    loading: () => <Shimmer />,
  }
);

export default function Home() {
  return (
    <LayoutWrapper>
      <ThemeToggle />
    </LayoutWrapper>
  );
}
