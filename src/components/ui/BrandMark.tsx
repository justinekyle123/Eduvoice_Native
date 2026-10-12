import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils/cn";
import { colors, gradients, shadows } from "@/theme";

import { AppText } from "./AppText";

export type BrandMarkProps = {
  className?: string;
};

/** Logo lockup: gradient headphones chip + "eduvoice" wordmark. */
export function BrandMark({ className }: BrandMarkProps) {
  return (
    <View className={cn("flex-row items-center gap-2.5", className)}>
      <View className="overflow-hidden rounded-[11px]" style={shadows.soft}>
        <LinearGradient
          colors={gradients.brand.colors}
          start={gradients.brand.start}
          end={gradients.brand.end}
          style={{ width: 34, height: 34, alignItems: "center", justifyContent: "center" }}
        >
          <Icon name="headphones" size={19} color={colors.white} />
        </LinearGradient>
      </View>
      <AppText variant="cardTitle" style={{ fontSize: 17, letterSpacing: -0.8 }}>
        eduvoice
      </AppText>
    </View>
  );
}
