import { Pressable, View, type StyleProp, type ViewStyle } from "react-native";

import { Icon, type IconName } from "@/components/icons";
import { cn } from "@/lib/utils/cn";
import { colors, shadows } from "@/theme";

import { AppText } from "./AppText";

export type ChipProps = {
  label: string;
  icon?: IconName;
  selected?: boolean;
  onPress?: () => void;
  className?: string;
  style?: StyleProp<ViewStyle>;
};

/**
 * Small pill used for voice suggestions, library filters and composer context
 * chips. Renders as a plain View when it has no press handler.
 */
export function Chip({ label, icon, selected = false, onPress, className, style }: ChipProps) {
  const content = (
    <>
      {icon ? <Icon name={icon} size={13} color={selected ? colors.accent.deep : colors.muted.base} /> : null}
      <AppText variant="label" tone={selected ? "accent" : "muted"} numberOfLines={1}>
        {label}
      </AppText>
    </>
  );

  const classes = cn(
    "flex-row items-center gap-1.5 self-start rounded-chip border px-3.5 py-2",
    selected ? "border-accent/40 bg-white/90" : "border-white/92 bg-white/55",
    className,
  );

  if (!onPress) {
    return (
      <View className={classes} style={[shadows.soft, style]}>
        {content}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      className={classes}
      style={({ pressed }) => [shadows.soft, pressed ? { opacity: 0.85 } : null, style]}
    >
      {content}
    </Pressable>
  );
}
