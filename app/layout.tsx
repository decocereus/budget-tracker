import type { Metadata } from "next";
import { JetBrains_Mono, Poppins } from "next/font/google";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import BaseProvider from "@/providers/BaseProvider";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Budget It",
  description: "A simple budget tracker for all your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(jetBrainsMono.variable, poppins.variable, "antialiased")}
      >
        <BaseProvider>
          {children}
          <Toaster />
        </BaseProvider>
      </body>
    </html>
  );
}
