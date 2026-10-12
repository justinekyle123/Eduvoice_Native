import { LinearGradient } from "expo-linear-gradient";
import { Pressable, View } from "react-native";

import { Icon } from "@/components/icons";
import { colors, gradients, radius, shadows } from "@/theme";

export type VoiceControlsProps = {
  listening: boolean;
  onCancel: () => void;
  onToggleListening: () => void;
  onConfirm: () => void;
  confirmDisabled?: boolean;
};

/** Cancel / microphone / confirm row at the bottom of voice mode. */
export function VoiceControls({
  listening,
  onCancel,
  onToggleListening,
  onConfirm,
  confirmDisabled = false,
}: VoiceControlsProps) {
  return (
    <View className="flex-row items-center justify-center gap-5">
      <RoundControl label="Close voice mode" onPress={onCancel}>
        <Icon name="close" size={18} color={colors.muted.base} strokeWidth={2} />
      </RoundControl>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={listening ? "Pause listening" : "Resume listening"}
        accessibilityState={{ selected: listening }}
        onPress={onToggleListening}
        style={({ pressed }) => [
          {
            width: 70,
            height: 70,
            borderRadius: radius.pill,
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            // Opaque backing so the shadow renders on iOS; covered by either
            // the active gradient or the idle navy fill.
            backgroundColor: colors.navy.soft,
          },
          shadows.raised,
          pressed ? { opacity: 0.9 } : null,
        ]}
      >
        {listening ? (
          <LinearGradient
            colors={gradients.micActive.colors}
            start={gradients.micActive.start}
            end={gradients.micActive.end}
            style={{ flex: 1, alignSelf: "stretch", alignItems: "center", justifyContent: "center" }}
          >
            <Icon name="microphone" size={27} color={colors.white} />
          </LinearGradient>
        ) : (
          <View className="flex-1 items-center justify-center bg-navy-soft">
            <Icon name="microphone" size={27} color={colors.white} />
          </View>
        )}
      </Pressable>

      <RoundControl
        label="Send what Eduvoice heard"
        onPress={onConfirm}
        disabled={confirmDisabled}
        opacity={confirmDisabled ? 0.45 : 1}
      >
        <Icon name="check" size={22} color={confirmDisabled ? colors.muted.soft : colors.ink.base} />
      </RoundControl>
    </View>
  );
}

function RoundControl({
  children,
  label,
  onPress,
  disabled = false,
  opacity = 1,
}: {
  children: React.ReactNode;
  label: string;
  onPress: () => void;
  disabled?: boolean;
  opacity?: number;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={onPress}
      className="h-[49px] w-[49px] items-center justify-center rounded-full border border-white/90 bg-white/60"
      style={({ pressed }) => [shadows.soft, { opacity }, pressed ? { opacity: opacity * 0.85 } : null]}
    >
      {children}
    </Pressable>
  );
}
