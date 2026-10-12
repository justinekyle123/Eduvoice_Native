import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";

import { FadeInUp } from "@/components/animation";
import { AppText, Screen } from "@/components/ui";
import { Composer, useChat, type ComposerSubmitPayload } from "@/features/chat";
import { interestById, useOnboarding } from "@/features/onboarding";
import { mockUser } from "@/features/profile/constants";

import { FocusCard } from "../components/FocusCard";
import { GreetingHeader } from "../components/GreetingHeader";
import { StreakCard } from "../components/StreakCard";
import { VoiceCard } from "../components/VoiceCard";
import { focusSession, streakSummary } from "../data/home-content";

/** Home tab: greeting, voice entry point, today's plan and the inline composer. */
export function HomeScreen() {
  const router = useRouter();
  const { profile } = useOnboarding();
  const { startConversation } = useChat();
  const [sending, setSending] = useState(false);

  const focusArea = profile.interests.map((id) => interestById[id]?.title).filter(Boolean) as string[];
  const hint = focusArea.length ? `Ready to help you ${focusArea[0].toLowerCase()}.` : undefined;

  const handleSubmit = useCallback(
    async ({ text, mode, attachments }: ComposerSubmitPayload) => {
      if (sending) return;
      setSending(true);
      const conversationId = await startConversation({ text, mode, attachments });
      setSending(false);
      router.push({ pathname: "/conversation/[id]", params: { id: conversationId } });
    },
    [router, sending, startConversation],
  );

  return (
    <Screen contentClassName="pb-32">
      <FadeInUp>
        <GreetingHeader name={mockUser.firstName} />
      </FadeInUp>

      <FadeInUp delay={80} className="mt-5">
        <VoiceCard onStartVoice={() => router.push("/voice")} hint={hint} />
      </FadeInUp>

      <FadeInUp delay={140} className="mt-4">
        <View className="flex-row gap-4">
          <FocusCard
            session={focusSession}
            onStart={() =>
              handleSubmit({ text: `Let's start: ${focusSession.title}`, attachments: [] })
            }
          />
          <StreakCard streak={streakSummary} />
        </View>
      </FadeInUp>

      <FadeInUp delay={200} className="mt-5">
        <AppText variant="cardLabel" tone="soft" className="mb-2.5">
          Ask anything
        </AppText>
        <Composer onSubmit={handleSubmit} />
      </FadeInUp>
    </Screen>
  );
}
