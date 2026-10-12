import { useRouter } from "expo-router";
import { useCallback } from "react";
import { View } from "react-native";

import { FadeInUp } from "@/components/animation";
import { AppText, Screen, Surface } from "@/components/ui";
import { interestById, useOnboarding } from "@/features/onboarding";

import { FocusAreas } from "../components/FocusAreas";
import { PreferenceRow } from "../components/PreferenceRow";
import { ProfileHeader } from "../components/ProfileHeader";
import { SettingRow } from "../components/SettingRow";
import { mockUser } from "../constants";
import { usePreferences } from "../hooks/usePreferences";

/** Profile tab: identity, focus areas, voice preferences and account actions. */
export function ProfileScreen() {
  const router = useRouter();
  const { profile, reset } = useOnboarding();
  const { preferences, setPreference } = usePreferences();

  const areas = profile.interests.map((id) => interestById[id]?.title).filter(Boolean) as string[];

  const retakeOnboarding = useCallback(async () => {
    await reset();
    router.replace("/(onboarding)/welcome");
  }, [reset, router]);

  return (
    <Screen contentClassName="pb-28">
      <FadeInUp>
        <ProfileHeader user={mockUser} />
      </FadeInUp>

      <FadeInUp delay={80} className="mt-4">
        <FocusAreas areas={areas} onEdit={() => router.push("/(onboarding)/personalize")} />
      </FadeInUp>

      <FadeInUp delay={140} className="mt-4">
        <Surface className="overflow-hidden py-0">
          <View className="border-b border-white/70 px-4 pb-1 pt-4">
            <AppText variant="cardLabel" tone="soft">
              Voice & reminders
            </AppText>
          </View>
          <PreferenceRow
            icon="volume"
            label="Spoken replies"
            description="Eduvoice reads answers out loud"
            value={preferences.spokenReplies}
            onChange={(value) => setPreference("spokenReplies", value)}
          />
          <View className="mx-4 h-[1px] bg-white/70" />
          <PreferenceRow
            icon="bell"
            label="Daily reminder"
            description="A gentle nudge to keep your streak"
            value={preferences.dailyReminder}
            onChange={(value) => setPreference("dailyReminder", value)}
          />
        </Surface>
      </FadeInUp>

      <FadeInUp delay={200} className="mt-4">
        <Surface className="overflow-hidden py-0">
          <SettingRow icon="sliders" label="Learning modes" description="Debate, hint and interview" accessory="Soon" disabled />
          <View className="mx-4 h-[1px] bg-white/70" />
          <SettingRow icon="sparkles" label="Appearance" description="Eduvoice is light by design" accessory="Light" />
          <View className="mx-4 h-[1px] bg-white/70" />
          <SettingRow
            icon="graduation"
            label="Retake onboarding"
            description="Pick your focus areas again"
            onPress={retakeOnboarding}
          />
          <View className="mx-4 h-[1px] bg-white/70" />
          <SettingRow icon="logout" label="Sign out" description="Accounts arrive with auth" accessory="Soon" disabled />
        </Surface>
      </FadeInUp>

      <AppText variant="caption" tone="faint" className="mt-6 text-center">
        Eduvoice · voice-first learning
      </AppText>
    </Screen>
  );
}
