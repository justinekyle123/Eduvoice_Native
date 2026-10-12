import { View } from "react-native";

import { AppText, Chip } from "@/components/ui";

import { SUGGESTED_PROMPTS } from "../constants";

export type VoiceSuggestionsProps = {
  onSelect: (prompt: string) => void;
};

/** "Try saying" prompts that seed a voice turn. */
export function VoiceSuggestions({ onSelect }: VoiceSuggestionsProps) {
  return (
    <View className="items-center">
      <AppText variant="cardLabel" tone="soft">
        Try saying
      </AppText>
      <View className="mt-3 flex-row flex-wrap justify-center gap-2">
        {SUGGESTED_PROMPTS.map((prompt) => (
          <Chip key={prompt} label={prompt} onPress={() => onSelect(prompt)} className="border-white/90 bg-white/55" />
        ))}
      </View>
    </View>
  );
}
