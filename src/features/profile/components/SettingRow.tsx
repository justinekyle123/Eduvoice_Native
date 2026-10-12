import { Pressable, View } from "react-native";

import { Icon, type IconName } from "@/components/icons";
import { AppText } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import { colors } from "@/theme";

export type SettingRowProps = {
  icon: IconName;
  label: string;
  description?: string;
  /** Right-hand value or badge, e.g. "Light" or "Soon". */
  accessory?: string;
  onPress?: () => void;
  disabled?: boolean;
};

/** Utility row used for appearance, onboarding reset and sign out. */
export function SettingRow({ icon, label, description, accessory, onPress, disabled = false }: SettingRowProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      accessibilityLabel={label}
      disabled={disabled || !onPress}
      onPress={onPress}
      className={cn("flex-row items-center gap-3 px-4 py-3.5", disabled ? "opacity-55" : null)}
      style={({ pressed }) => (pressed && !disabled ? { opacity: 0.85 } : null)}
    >
      <View className="h-9 w-9 items-center justify-center rounded-[11px] bg-[#e4e8f7]">
        <Icon name={icon} size={17} color={colors.accent.ink} />
      </View>

      <View className="flex-1">
        <AppText variant="label">{label}</AppText>
        {description ? (
          <AppText variant="caption" tone="soft" className="mt-0.5">
            {description}
          </AppText>
        ) : null}
      </View>

      {accessory ? (
        <AppText variant="cardLabel" tone="soft">
          {accessory}
        </AppText>
      ) : null}
      {onPress && !disabled ? <Icon name="arrow" size={16} color={colors.muted.soft} /> : null}
    </Pressable>
  );
}
