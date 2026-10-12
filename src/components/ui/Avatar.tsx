import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

import { cn } from "@/lib/utils/cn";
import { getInitials } from "@/lib/utils/format";
import { gradients, shadows } from "@/theme";

import { AppText } from "./AppText";

export type AvatarProps = {
  name: string;
  size?: number;
  className?: string;
};

/** Circular gradient avatar with initials (no image upload flow yet). */
export function Avatar({ name, size = 44, className }: AvatarProps) {
  return (
    <View
      // The white fill backs the translucent border so the shadow paints on iOS.
      className={cn("overflow-hidden rounded-full border-[3px] border-white/80 bg-white", className)}
      style={[{ width: size, height: size }, shadows.soft]}
    >
      <LinearGradient
        colors={gradients.avatar.colors}
        start={gradients.avatar.start}
        end={gradients.avatar.end}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <AppText variant="labelLg" tone="inverse" style={{ fontSize: size * 0.28 }}>
          {getInitials(name)}
        </AppText>
      </LinearGradient>
    </View>
  );
}
