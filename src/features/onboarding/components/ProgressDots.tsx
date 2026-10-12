import { View } from "react-native";

import { cn } from "@/lib/utils/cn";
import { radius } from "@/theme";

import { ONBOARDING_STEP_COUNT } from "../constants";

export type ProgressDotsProps = {
  /** Zero-based index of the active step. */
  active: number;
  className?: string;
};

/** Segmented progress indicator shared by the onboarding steps. */
export function ProgressDots({ active, className }: ProgressDotsProps) {
  return (
    <View
      className={cn("flex-row items-center gap-2", className)}
      accessibilityRole="progressbar"
      accessibilityLabel={`Step ${active + 1} of ${ONBOARDING_STEP_COUNT}`}
    >
      {Array.from({ length: ONBOARDING_STEP_COUNT }).map((_, index) => (
        <View
          key={index}
          className={cn("h-1 rounded-full", index === active ? "w-10 bg-accent-deep" : "w-6 bg-[#dfe5ed]")}
          style={{ borderRadius: radius.pill }}
        />
      ))}
    </View>
  );
}
