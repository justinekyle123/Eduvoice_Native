import { useRouter } from "expo-router";
import { useWindowDimensions } from "react-native";

import { FadeInUp, FloatingView } from "@/components/animation";
import { AppText, BrandMark, PrimaryButton, Screen } from "@/components/ui";
import { colors } from "@/theme";

import { ProgressDots } from "../components/ProgressDots";
import { RobotMascot } from "../components/RobotMascot";

/** Step 1 — the voice-first promise, with Eduvoice's robot companion. */
export function WelcomeScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();

  // Keeps the hero, the copy and the button on screen on short devices.
  const mascotSize = Math.max(170, Math.min(272, height * 0.34));

  return (
    <Screen padded={false} contentClassName="px-5 pb-7 pt-2">
      <FadeInUp duration={500}>
        <BrandMark className="mt-1" />
      </FadeInUp>

      <FloatingView className="flex-1 items-center justify-center py-4" amplitude={9} duration={5600} delay={220}>
        <RobotMascot size={mascotSize} />
      </FloatingView>

      <FadeInUp delay={140} className="items-center">
        <AppText variant="display" className="text-center">
          Learn your way.
        </AppText>
        <AppText variant="display" className="text-center" style={{ color: colors.accent.headline }}>
          Speak naturally.
        </AppText>
        <AppText variant="bodySm" tone="muted" className="mt-3 max-w-[330px] text-center leading-5">
          Plan, understand, and remember more with a voice-first assistant built around you.
        </AppText>
      </FadeInUp>

      <FadeInUp delay={260} className="my-6 self-center">
        <ProgressDots active={0} />
      </FadeInUp>

      <FadeInUp delay={340}>
        <PrimaryButton label="Get started" onPress={() => router.push("/(onboarding)/personalize")} />
      </FadeInUp>
    </Screen>
  );
}
