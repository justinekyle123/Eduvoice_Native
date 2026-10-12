import { Pressable, View } from "react-native";

import { Icon } from "@/components/icons";
import { AppText } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import { colors } from "@/theme";

import type { Interest, InterestTone } from "../types";

const toneStyles: Record<InterestTone, { chip: string; icon: string }> = {
  mint: { chip: "bg-mint-tint", icon: colors.success },
  sky: { chip: "bg-sky-tint", icon: "#316cac" },
  gold: { chip: "bg-gold-tint", icon: "#a87513" },
  lavender: { chip: "bg-lavender-tint", icon: "#5f5c99" },
  violet: { chip: "bg-violet-tint", icon: "#56458a" },
  neutral: { chip: "bg-sunken", icon: colors.muted.base },
};

export type InterestCardProps = {
  interest: Interest;
  selected: boolean;
  onToggle: (id: Interest["id"]) => void;
};

/** Toggleable tile on the "What can I help with?" step. */
export function InterestCard({ interest, selected, onToggle }: InterestCardProps) {
  const tone = toneStyles[interest.tone];

  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: selected }}
      accessibilityLabel={`${interest.title}. ${interest.description}`}
      onPress={() => onToggle(interest.id)}
      className={cn(
        "min-h-[96px] flex-1 rounded-chip border p-3",
        selected ? "border-accent/50 bg-[#f2f8ff]" : "border-white/80 bg-white/55",
      )}
      style={({ pressed }) => (pressed ? { opacity: 0.9 } : null)}
    >
      {selected ? (
        <View className="absolute right-2.5 top-2.5 h-[18px] w-[18px] items-center justify-center rounded-full bg-accent">
          <Icon name="check" size={11} color={colors.white} strokeWidth={2.6} />
        </View>
      ) : null}

      <View className={cn("h-7 w-7 items-center justify-center rounded-full", tone.chip)}>
        <Icon name={interest.icon} size={16} color={tone.icon} />
      </View>

      <AppText variant="label" className="mt-2.5">
        {interest.title}
      </AppText>
      <AppText variant="caption" tone="muted" className="mt-0.5">
        {interest.description}
      </AppText>
    </Pressable>
  );
}
