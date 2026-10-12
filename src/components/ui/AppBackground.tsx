import { StyleSheet, View } from "react-native";
import Svg, { Circle, Defs, LinearGradient, Pattern, RadialGradient, Rect, Stop } from "react-native-svg";

import { colors, texture } from "@/theme";

export type AppBackgroundVariant = "shell" | "voice";

type StopSpec = { offset: string; color: string; opacity?: number };

const shellStops: StopSpec[] = [
  { offset: "0", color: colors.shell.base },
  { offset: "0.47", color: colors.shell.soft },
  { offset: "1", color: colors.shell.warm },
];

const voiceStops: StopSpec[] = [
  { offset: "0", color: "#edf7ff" },
  { offset: "0.52", color: "#f8f9ff" },
  { offset: "1", color: "#f7eff8" },
];

/**
 * The soft blue/lavender canvas from the design.
 *
 * Built with SVG gradients so the two ambient blobs and the fine dot texture
 * match the reference on every platform (React Native has no radial-gradient or
 * backdrop-filter equivalent).
 */
export function AppBackground({
  variant = "shell",
  showTexture = true,
}: {
  variant?: AppBackgroundVariant;
  showTexture?: boolean;
}) {
  const textureColor = variant === "voice" ? "#5a74a2" : colors.texture;
  const textureOpacity = variant === "voice" ? 0.18 : texture.opacity;
  const baseStops = variant === "voice" ? voiceStops : shellStops;

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Svg width="100%" height="100%">
        <Defs>
          <LinearGradient id="edu-base" x1="0" y1="0" x2="1" y2="1">
            {baseStops.map((stop) => (
              <Stop key={`base-${stop.offset}`} offset={stop.offset} stopColor={stop.color} stopOpacity={stop.opacity} />
            ))}
          </LinearGradient>

          <RadialGradient id="edu-warm" cx="72%" cy="24%" r="60%">
            <Stop offset="0" stopColor={colors.ambient.pink} stopOpacity={0.82} />
            <Stop offset="1" stopColor={colors.ambient.pink} stopOpacity={0} />
          </RadialGradient>

          <RadialGradient id="edu-cool" cx="13%" cy="86%" r="65%">
            <Stop offset="0" stopColor={colors.ambient.blue} stopOpacity={0.9} />
            <Stop offset="1" stopColor={colors.ambient.blue} stopOpacity={0} />
          </RadialGradient>

          {variant === "voice" ? (
            <RadialGradient id="edu-voice-core" cx="50%" cy="42%" r="45%">
              <Stop offset="0" stopColor="#cddcff" stopOpacity={0.75} />
              <Stop offset="1" stopColor="#cddcff" stopOpacity={0} />
            </RadialGradient>
          ) : null}

          {variant === "voice" ? (
            <RadialGradient id="edu-voice-bloom" cx="88%" cy="14%" r="50%">
              <Stop offset="0" stopColor="#fadceb" stopOpacity={0.72} />
              <Stop offset="1" stopColor="#fadceb" stopOpacity={0} />
            </RadialGradient>
          ) : null}

          <Pattern id="edu-dots" patternUnits="userSpaceOnUse" width={texture.size} height={texture.size}>
            <Circle cx={1} cy={1} r={texture.dotRadius} fill={textureColor} fillOpacity={0.12} />
          </Pattern>
        </Defs>

        <Rect width="100%" height="100%" fill="url(#edu-base)" />
        <Rect width="100%" height="100%" fill="url(#edu-warm)" />
        <Rect width="100%" height="100%" fill="url(#edu-cool)" />
        {variant === "voice" ? <Rect width="100%" height="100%" fill="url(#edu-voice-core)" /> : null}
        {variant === "voice" ? <Rect width="100%" height="100%" fill="url(#edu-voice-bloom)" /> : null}
        {showTexture ? <Rect width="100%" height="100%" fill="url(#edu-dots)" opacity={textureOpacity} /> : null}
      </Svg>
    </View>
  );
}
