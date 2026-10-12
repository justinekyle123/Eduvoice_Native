import { View } from "react-native";

import { cn } from "@/lib/utils/cn";

import { AppText } from "./AppText";

export type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
};

/** Editorial heading block used on onboarding and empty states. */
export function SectionHeading({ eyebrow, title, subtitle, align = "center", className }: SectionHeadingProps) {
  return (
    <View className={cn(align === "center" ? "items-center" : "items-start", className)}>
      {eyebrow ? (
        <AppText variant="eyebrow" tone="accentInk">
          {eyebrow}
        </AppText>
      ) : null}
      <AppText variant="heading" className={cn("mt-1.5", align === "center" ? "text-center" : "text-left")}>
        {title}
      </AppText>
      {subtitle ? (
        <AppText variant="body" tone="muted" className={cn("mt-1", align === "center" ? "text-center" : "text-left")}>
          {subtitle}
        </AppText>
      ) : null}
    </View>
  );
}
