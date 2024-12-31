"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const labelVariants = cva(
  "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      intent: {
        largeHeadline: "text-2xl",
        headline: "text-xl",
        paragraph: "text-lg",
        body: "text-sm",
        info: "text-xs",
      },
      weight: {
        bold: "text-bold",
        semibold: "text-semibold",
        medium: "text-medium",
        normal: "text-normal",
      },
      align: {
        left: "text-left",
        right: "text-right",
        center: "text-center",
        justify: "text-justify",
      },
      fontFamily: {
        mono: "font-mono",
        sans: "font-sans",
        poppins: "font-poppins",
        jetbrains: "font-jetbrains-mono",
      },
      textTransform: {
        uppercase: "uppercase",
        lowercase: "lowercase",
        underline: "underline",
      },
    },
    defaultVariants: {
      intent: "paragraph",
      weight: "normal",
      fontFamily: "jetbrains",
    },
  }
);

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      className = "",
      intent,
      weight,
      align,
      fontFamily,
      textTransform,
      ...props
    },
    ref
  ) => {
    return (
      <LabelPrimitive.Root
        ref={ref}
        className={cn(
          labelVariants({ intent, weight, align, fontFamily, textTransform }),
          className
        )}
        {...props}
      />
    );
  }
);

Label.displayName = "Label";

export default Label;
