import LayoutWrapper from "@/components/layout-wrapper";
import Label from "@/components/ui/label/label";

export default function Home() {
  return (
    <LayoutWrapper className="flex items-center flex-col gap-y-6">
      <Label>Hello, World</Label>
    </LayoutWrapper>
  );
}
