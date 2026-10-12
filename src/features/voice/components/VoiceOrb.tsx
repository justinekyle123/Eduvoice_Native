import { LinearGradient } from "expo-linear-gradient";
import { Pressable, View } from "react-native";

import { PulseRing } from "@/components/animation";
import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils/cn";
import { colors, gradients, radius, shadows } from "@/theme";

export type VoiceOrbProps = {
  onPress: () => void;
  size?: number;
  className?: string;
};

/** Tap target on the home screen that opens voice mode. */
export function VoiceOrb({ onPress, size = 96, className }: VoiceOrbProps) {
  return (
    <View className={cn("items-center justify-center", className)} style={{ width: size + 20, height: size + 20 }}>
      <PulseRing
        active
        duration={2000}
        style={{
          position: "absolute",
          width: size + 18,
          height: size + 18,
          borderRadius: radius.pill,
          borderWidth: 1,
          borderColor: "rgba(105,142,213,0.2)",
        }}
      />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Start voice mode"
        onPress={onPress}
        className="overflow-hidden border border-white/70"
        style={({ pressed }) => [
          // Opaque backing so the glow paints on iOS as well (the gradient
          // sits on top of it).
          { width: size, height: size, borderRadius: radius.pill, backgroundColor: "#6a88e7" },
          shadows.orb,
          pressed ? { opacity: 0.92 } : null,
        ]}
      >
        <LinearGradient
          colors={gradients.homeOrb.colors}
          start={gradients.homeOrb.start}
          end={gradients.homeOrb.end}
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Icon name="microphone" size={size * 0.27} color={colors.white} />
        </LinearGradient>
      </Pressable>
    </View>
  );
}
