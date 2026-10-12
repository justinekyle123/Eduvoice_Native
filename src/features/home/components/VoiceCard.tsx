import { View } from "react-native";

import { AppText, Surface } from "@/components/ui";
import { VoiceOrb } from "@/features/voice/components/VoiceOrb";

export type VoiceCardProps = {
  onStartVoice: () => void;
  /** Shown under the headline, e.g. after onboarding. */
  hint?: string;
};

/** Primary card on the home tab: tap the orb (or type) to talk to Eduvoice. */
export function VoiceCard({ onStartVoice, hint }: VoiceCardProps) {
  return (
    <Surface variant="strong" className="items-center gap-4 px-6 py-7">
      <VoiceOrb onPress={onStartVoice} />

      <View className="items-center">
        <AppText variant="eyebrow" tone="accentInk">
          Eduvoice is ready
        </AppText>
        <AppText variant="headingSm" className="mt-2 text-center">
          What do you want to learn?
        </AppText>
        <AppText variant="body" tone="muted" className="mt-1.5 text-center">
          {hint ?? "Tap the mic or type a question to begin."}
        </AppText>
      </View>
    </Surface>
  );
}
