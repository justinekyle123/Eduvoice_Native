import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { Animated, Easing, useWindowDimensions, View } from "react-native";

import { AppText, Screen, SectionHeading } from "@/components/ui";
import { gradients, radius } from "@/theme";

import { FloatingTools } from "../components/FloatingTools";
import { RobotMascot } from "../components/RobotMascot";
import { PREPARING_DURATION_MS } from "../constants";
import { useOnboarding } from "../hooks/useOnboarding";

/** Step 3 — short "getting ready" beat that finishes onboarding. */
export function PreparingScreen() {
  const router = useRouter();
  const { complete } = useOnboarding();
  const { height } = useWindowDimensions();
  const progress = useRef(new Animated.Value(0)).current;
  const mascotSize = Math.max(170, Math.min(250, height * 0.32));

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: PREPARING_DURATION_MS - 150,
      easing: Easing.bezier(0.2, 0.7, 0.2, 1),
      useNativeDriver: false,
    }).start();
  }, [progress]);

  useEffect(() => {
    let active = true;

    const timer = setTimeout(async () => {
      await complete();
      if (active) router.replace("/(tabs)");
    }, PREPARING_DURATION_MS);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [complete, router]);

  return (
    <Screen scroll={false} padded={false}>
      <View className="flex-1 items-center justify-center px-6 pb-10">
        <View className="w-full items-center justify-center" style={{ height: Math.min(320, height * 0.44) }}>
          <FloatingTools />
          <RobotMascot size={mascotSize} compact cup />
        </View>

        <SectionHeading
          title="Getting everything ready for you..."
          subtitle="Your personalized learning space is taking shape."
          className="mt-2 max-w-[320px]"
        />

        <View
          className="mt-8 h-[5px] w-[80%] max-w-[320px] overflow-hidden bg-[#d4dce9]"
          style={{ borderRadius: radius.pill }}
        >
          <Animated.View
            style={{
              height: "100%",
              width: progress.interpolate({ inputRange: [0, 1], outputRange: ["3%", "100%"] }),
            }}
          >
            <LinearGradient
              colors={gradients.progress.colors}
              start={gradients.progress.start}
              end={gradients.progress.end}
              style={{ flex: 1 }}
            />
          </Animated.View>
        </View>

        <AppText variant="caption" tone="soft" className="mt-3.5">
          Just a moment...
        </AppText>
      </View>
    </Screen>
  );
}
