import { Pressable, type StyleProp, type ViewStyle } from "react-native";

import { Icon, type IconName } from "@/components/icons";
import { cn } from "@/lib/utils/cn";
import { colors, radius, shadows } from "@/theme";

export type IconButtonProps = {
  name: IconName;
  onPress: () => void;
  accessibilityLabel: string;
  iconSize?: number;
  iconColor?: string;
  size?: "sm" | "md";
  className?: string;
  style?: StyleProp<ViewStyle>;
};

const sizes = {
  sm: 38,
  md: 44,
} as const;

/** Circular translucent control used for back, close and header actions. */
export function IconButton({
  name,
  onPress,
  accessibilityLabel,
  iconSize,
  iconColor = colors.ink.base,
  size = "sm",
  className,
  style,
}: IconButtonProps) {
  const dimension = sizes[size];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      className={cn("items-center justify-center rounded-full border border-white/85 bg-white/60", className)}
      style={({ pressed }) => [
        { width: dimension, height: dimension, borderRadius: radius.pill },
        shadows.soft,
        pressed ? { opacity: 0.85 } : null,
        style,
      ]}
    >
      <Icon name={name} size={iconSize ?? dimension * 0.48} color={iconColor} />
    </Pressable>
  );
}
