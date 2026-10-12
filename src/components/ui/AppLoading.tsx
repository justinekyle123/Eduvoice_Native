import { ActivityIndicator, View } from "react-native";

import { colors } from "@/theme";

import { AppBackground } from "./AppBackground";
import { AppText } from "./AppText";
import { BrandMark } from "./BrandMark";

/** Shown while fonts load or the stored profile is being read. */
export function AppLoading({ label = "Waking Eduvoice up" }: { label?: string }) {
  return (
    <View className="flex-1">
      <AppBackground />
      <View className="flex-1 items-center justify-center gap-5">
        <BrandMark />
        <ActivityIndicator color={colors.accent.deep} />
        <AppText variant="bodySm" tone="muted">
          {label}...
        </AppText>
      </View>
    </View>
  );
}
