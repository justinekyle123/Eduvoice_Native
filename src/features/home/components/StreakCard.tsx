import { View } from "react-native";

import { AppText, Surface } from "@/components/ui";
import { cn } from "@/lib/utils/cn";

import type { StreakSummary } from "../data/home-content";

export type StreakCardProps = {
  streak: StreakSummary;
};

/** This-week streak summary with the seven day markers. */
export function StreakCard({ streak }: StreakCardProps) {
  const label = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <Surface className="flex-1 p-4">
      <AppText variant="cardLabel" tone="soft">
        {streak.label}
      </AppText>

      <AppText variant="display" className="mt-2" style={{ fontSize: 44, lineHeight: 42 }}>
        {streak.days}
      </AppText>
      <AppText variant="bodySm" tone="muted" className="mt-1">
        {streak.caption}
      </AppText>

      <View className="mt-4 flex-row gap-1.5">
        {streak.week.map((done, index) => (
          <View
            key={`${index}-${label[index]}`}
            className={cn("h-[5px] flex-1 rounded-full", done ? "bg-accent-soft" : "bg-[#dce2ea]")}
          />
        ))}
      </View>
    </Surface>
  );
}
