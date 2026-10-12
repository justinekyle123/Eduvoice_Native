import { useRouter } from "expo-router";
import { ScrollView, useWindowDimensions, View } from "react-native";

import { FadeInUp } from "@/components/animation";
import { AppText, IconButton, PrimaryButton, Screen, SectionHeading } from "@/components/ui";
import { chunk } from "@/lib/utils/array";

import { InterestCard } from "../components/InterestCard";
import { ProgressDots } from "../components/ProgressDots";
import { RobotMascot } from "../components/RobotMascot";
import { INTERESTS } from "../constants";
import { useOnboarding } from "../hooks/useOnboarding";

/**
 * Step 2 — pick the things Eduvoice should help with.
 *
 * The grid scrolls on its own so the Continue button is always on screen, no
 * matter how tall the interest list or how short the device is.
 */
export function PersonalizeScreen() {
  const router = useRouter();
  const { height } = useWindowDimensions();
  const { profile, toggleInterest } = useOnboarding();
  const rows = chunk(INTERESTS, 2);
  const mascotSize = Math.max(120, Math.min(180, height * 0.2));

  return (
    <Screen scroll={false} padded={false}>
      <View className="flex-1 px-5 pb-6 pt-2">
        <View className="flex-row items-center justify-between">
          <IconButton name="chevron" onPress={() => router.back()} accessibilityLabel="Go back" />
          <ProgressDots active={1} />
          <View className="w-[38px]" />
        </View>

        <ScrollView
          className="flex-1"
          contentContainerClassName="pb-3"
          showsVerticalScrollIndicator={false}
          accessibilityLabel="Choose what Eduvoice should help with"
        >
          <FadeInUp duration={500} className="items-center">
            <RobotMascot size={mascotSize} showScene={false} />
            <SectionHeading
              eyebrow="Personalize your space"
              title="What can I help with?"
              subtitle="Choose a few to get started."
            />
          </FadeInUp>

          <View className="mt-4 gap-2">
            {rows.map((row, index) => (
              <View key={index} className="flex-row gap-2">
                {row.map((interest) => (
                  <InterestCard
                    key={interest.id}
                    interest={interest}
                    selected={profile.interests.includes(interest.id)}
                    onToggle={toggleInterest}
                  />
                ))}
                {row.length === 1 ? <View className="flex-1" /> : null}
              </View>
            ))}
          </View>
        </ScrollView>

        <View className="gap-3 pt-3">
          <AppText variant="caption" tone="soft" className="text-center">
            You can change these later in your profile.
          </AppText>
          <PrimaryButton
            label="Continue"
            disabled={profile.interests.length === 0}
            onPress={() => router.push("/(onboarding)/preparing")}
          />
        </View>
      </View>
    </Screen>
  );
}
