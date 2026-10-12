import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useRef } from "react";
import { Animated, Easing, Platform, View } from "react-native";

import { WAVEFORM_BARS } from "../constants";

const useNativeDriver = Platform.OS !== "web";

export type VoiceWaveformProps = {
  /** Bars animate only while Eduvoice is listening. */
  active: boolean;
  bars?: readonly number[];
};

/** Reactive-looking waveform bars driven by the built-in Animated API. */
export function VoiceWaveform({ active, bars = WAVEFORM_BARS }: VoiceWaveformProps) {
  const values = useRef(bars.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    if (!active) {
      values.forEach((value) => value.setValue(0));
      return;
    }

    const loops = values.map((value, index) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue: 1,
            duration: 900 + (index % 4) * 120,
            delay: (index % 5) * 80,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 900 + (index % 3) * 140,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver,
          }),
        ]),
      ),
    );

    loops.forEach((loop) => loop.start());
    return () => loops.forEach((loop) => loop.stop());
  }, [active, values]);

  return (
    <View className="h-[82px] flex-row items-center justify-center gap-1.5" accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {bars.map((height, index) => (
        <Animated.View
          key={`${height}-${index}`}
          style={{
            width: 4,
            height,
            borderRadius: 8,
            opacity: active ? 1 : 0.45,
            transform: [
              {
                scaleY: values[index].interpolate({ inputRange: [0, 1], outputRange: [0.12, 1] }),
              },
            ],
          }}
        >
          <LinearGradient
            colors={["#6baaf0", "#7773d7"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ flex: 1, borderRadius: 8 }}
          />
        </Animated.View>
      ))}
    </View>
  );
}
