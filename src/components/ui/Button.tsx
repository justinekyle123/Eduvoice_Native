import { LinearGradient } from "expo-linear-gradient";
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from "react-native";

import { Icon, type IconName } from "@/components/icons";
import { cn } from "@/lib/utils/cn";
import { colors, gradients } from "@/theme";

import { AppText } from "./AppText";

type ButtonBaseProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  className?: string;
};

export type PrimaryButtonProps = ButtonBaseProps & {
  /** Trailing glyph inside the circular chip. */
  icon?: IconName;
};

/** Dark gradient pill — the app's main call to action. */
export function PrimaryButton({ label, onPress, disabled = false, icon = "arrow", className }: PrimaryButtonProps) {
  const shadow: StyleProp<ViewStyle> = disabled ? null : styles.primaryShadow;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      className={cn("overflow-hidden rounded-full", className)}
      style={({ pressed }) => [shadow, pressed && styles.pressed, disabled && styles.disabled]}
    >
      <LinearGradient
        colors={gradients.primaryButton.colors}
        start={gradients.primaryButton.start}
        end={gradients.primaryButton.end}
        style={styles.primaryGradient}
      >
        <View style={styles.gradientSpacer} />
        <AppText variant="labelLg" tone="inverse" className="flex-1 text-center">
          {label}
        </AppText>
        <View style={styles.arrowChip}>
          <Icon name={icon} size={16} color="#182033" strokeWidth={2.2} />
        </View>
      </LinearGradient>
    </Pressable>
  );
}

/** Translucent pill for secondary actions such as "Share" or "Save". */
export function SecondaryButton({ label, onPress, disabled = false, className }: ButtonBaseProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      className={cn(
        "flex-row items-center justify-center gap-2 rounded-full border border-white/90 bg-white/70 px-5 py-3",
        pressedShadowClass(disabled),
        className,
      )}
      style={({ pressed }) => [disabled ? styles.disabled : null, pressed ? styles.pressed : null]}
    >
      <AppText variant="labelLg" tone="ink">
        {label}
      </AppText>
    </Pressable>
  );
}

const pressedShadowClass = (disabled: boolean) => cn(disabled ? "opacity-50" : "shadow-sm");

const styles = StyleSheet.create({
  primaryGradient: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    paddingLeft: 10,
    paddingRight: 10,
  },
  gradientSpacer: {
    width: 38,
  },
  arrowChip: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 19,
    backgroundColor: "#f7faff",
  },
  primaryShadow: {
    // iOS derives a layer's shadow from its own content, so the pill carries an
    // opaque backing colour that the gradient then covers completely.
    backgroundColor: colors.navy.deep,
    shadowColor: "#101b2d",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.22,
    shadowRadius: 26,
    elevation: 7,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  disabled: {
    opacity: 0.45,
  },
});

export const buttonColors = {
  arrowChip: "#f7faff",
  arrowIcon: colors.navy.base,
} as const;
