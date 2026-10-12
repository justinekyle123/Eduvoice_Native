import type { TabTriggerSlotProps } from "expo-router/ui";
import { forwardRef } from "react";
import { Pressable, View } from "react-native";

import { Icon, type IconName } from "@/components/icons";
import { AppText } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import { colors } from "@/theme";

export type TabBarButtonProps = TabTriggerSlotProps & {
  label: string;
  icon: IconName;
};

/**
 * One tab in the floating bar. `isFocused` is injected by `TabTrigger`, and the
 * remaining press props keep the trigger's navigation behaviour.
 */
export const TabBarButton = forwardRef<View, TabBarButtonProps>(function TabBarButton(
  { label, icon, isFocused, ...rest },
  ref,
) {
  return (
    <Pressable
      ref={ref}
      accessibilityRole="tab"
      accessibilityState={{ selected: isFocused }}
      className={cn(
        "h-[52px] flex-1 items-center justify-center gap-1 rounded-[18px]",
        isFocused ? "bg-[#edf4fb]" : null,
      )}
      {...rest}
    >
      <Icon name={icon} size={19} color={isFocused ? colors.accent.headline : colors.muted.soft} />
      <AppText variant="cardLabel" tone={isFocused ? "accentInk" : "soft"}>
        {label}
      </AppText>
    </Pressable>
  );
});
