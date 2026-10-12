import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

import { PulseRing } from "@/components/animation";
import { Icon } from "@/components/icons";
import { colors, gradients, radius, shadows } from "@/theme";

export type ListeningOrbProps = {
  listening: boolean;
  size?: number;
};

/** Gradient orb with expanding rings — the visual centrepiece of voice mode. */
export function ListeningOrb({ listening, size = 142 }: ListeningOrbProps) {
  return (
    <View className="items-center justify-center" style={{ width: size + 80, height: size + 80 }}>
      <PulseRing
        active={listening}
        duration={2000}
        style={{
          position: "absolute",
          width: size + 36,
          height: size + 36,
          borderRadius: radius.pill,
          borderWidth: 1,
          borderColor: "rgba(102,142,211,0.2)",
        }}
      />
      <PulseRing
        active={listening}
        duration={2000}
        delay={650}
        style={{
          position: "absolute",
          width: size + 74,
          height: size + 74,
          borderRadius: radius.pill,
          borderWidth: 1,
          borderColor: "rgba(102,142,211,0.1)",
        }}
      />

      <View
        className="overflow-hidden border border-white/80"
        style={[
          {
            width: size,
            height: size,
            borderRadius: radius.pill,
            // Opaque backing for the iOS shadow; the gradient covers it.
            backgroundColor: "#779ee9",
            transform: [{ scale: listening ? 1 : 0.94 }],
          },
          shadows.orb,
        ]}
      >
        <LinearGradient
          colors={gradients.voiceOrb.colors}
          start={gradients.voiceOrb.start}
          end={gradients.voiceOrb.end}
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              position: "absolute",
              top: 19,
              left: 31,
              width: 45,
              height: 21,
              borderRadius: radius.pill,
              backgroundColor: "rgba(255,255,255,0.29)",
              transform: [{ rotate: "-24deg" }],
            }}
          />
          <Icon name={listening ? "microphone" : "sparkles"} size={34} color={colors.white} />
        </LinearGradient>
      </View>
    </View>
  );
}
