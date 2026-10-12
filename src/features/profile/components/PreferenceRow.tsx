import { Switch, View } from "react-native";

import { Icon, type IconName } from "@/components/icons";
import { AppText } from "@/components/ui";
import { colors } from "@/theme";

export type PreferenceRowProps = {
  icon: IconName;
  label: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

/** Setting row with a switch, persisted through `usePreferences`. */
export function PreferenceRow({ icon, label, description, value, onChange }: PreferenceRowProps) {
  return (
    <View className="flex-row items-center gap-3 px-4 py-3.5">
      <View className="h-9 w-9 items-center justify-center rounded-[11px] bg-sky-tint">
        <Icon name={icon} size={17} color="#316cac" />
      </View>

      <View className="flex-1">
        <AppText variant="label">{label}</AppText>
        <AppText variant="caption" tone="soft" className="mt-0.5">
          {description}
        </AppText>
      </View>

      <Switch
        value={value}
        onValueChange={onChange}
        accessibilityLabel={label}
        trackColor={{ false: "#dce2ea", true: colors.accent.soft }}
        thumbColor={colors.white}
        ios_backgroundColor="#dce2ea"
      />
    </View>
  );
}
