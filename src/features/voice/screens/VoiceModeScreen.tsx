import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { View } from "react-native";

import { AppText, IconButton, Screen, Surface } from "@/components/ui";
import { useChat } from "@/features/chat";

import { ListeningOrb } from "../components/ListeningOrb";
import { VoiceControls } from "../components/VoiceControls";
import { VoiceSuggestions } from "../components/VoiceSuggestions";
import { VoiceWaveform } from "../components/VoiceWaveform";
import { VOICE_COPY } from "../constants";
import { useVoiceSession } from "../hooks/useVoiceSession";

/**
 * Full-screen voice session.
 *
 * Recognition itself is stubbed (see `services/voice-engine`), but the whole
 * loop is real: listening → transcript → send to Eduvoice → conversation.
 */
export function VoiceModeScreen() {
  const router = useRouter();
  const { startConversation } = useChat();
  const session = useVoiceSession();
  const [sending, setSending] = useState(false);

  const copy = session.isListening ? VOICE_COPY.listening : VOICE_COPY.captured;

  const confirm = useCallback(async () => {
    const text = session.transcript?.text;
    if (!text || sending) return;

    setSending(true);
    const conversationId = await startConversation({ text, source: "voice" });
    router.replace({ pathname: "/conversation/[id]", params: { id: conversationId } });
  }, [router, sending, session.transcript, startConversation]);

  return (
    <Screen background="voice" scroll={false} padded={false}>
      <View className="flex-1 px-5 pb-6 pt-2">
        <View className="flex-row items-center justify-between">
          <IconButton name="chevron" onPress={() => router.back()} accessibilityLabel="Close voice mode" />
          <View className="flex-row items-center gap-2">
            <View className="h-[7px] w-[7px] rounded-full bg-success" />
            <AppText variant="labelLg">Eduvoice</AppText>
          </View>
          <View className="w-[38px]" />
        </View>

        <View className="flex-1 items-center justify-center">
          <ListeningOrb listening={session.isListening} />

          <View className="mt-8 items-center">
            <AppText variant="eyebrow" tone="accentInk">
              {copy.eyebrow}
            </AppText>
            <AppText variant="title" className="mt-2 text-center">
              {copy.title}
            </AppText>
            <AppText variant="body" tone="muted" className="mt-2 max-w-[320px] text-center">
              {copy.body}
            </AppText>
          </View>

          {session.transcript && !session.isListening ? (
            <Surface variant="strong" className="mt-5 w-full max-w-[420px] px-4 py-3.5">
              <AppText variant="body" tone="inkStrong">
                {session.transcript.text}
              </AppText>
            </Surface>
          ) : null}

          <VoiceWaveform active={session.isListening} />

          <VoiceSuggestions onSelect={session.useSuggestion} />
        </View>

        <VoiceControls
          listening={session.isListening}
          onCancel={() => router.back()}
          onToggleListening={session.toggleListening}
          onConfirm={confirm}
          confirmDisabled={!session.transcript || sending}
        />

        <AppText variant="caption" tone="soft" className="mt-3 text-center">
          {session.isListening ? "Tap the mic to pause" : "Tap the mic to resume"}
        </AppText>
      </View>
    </Screen>
  );
}
