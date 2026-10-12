import { Pressable, View } from "react-native";

import { Chip, AppText, Surface } from "@/components/ui";

export type FocusAreasProps = {
  /** Interest titles picked during onboarding. */
  areas: string[];
  onEdit: () => void;
};

/** Shows what the user asked Eduvoice to help with. */
export function FocusAreas({ areas, onEdit }: FocusAreasProps) {
  return (
    <Surface className="p-4">
      <View className="flex-row items-center justify-between">
        <AppText variant="cardLabel" tone="soft">
          Focus areas
        </AppText>
        <Pressable accessibilityRole="button" accessibilityLabel="Edit focus areas" onPress={onEdit}>
          <AppText variant="cardLabel" tone="accentInk">
            Edit
          </AppText>
        </Pressable>
      </View>

      <View className="mt-3 flex-row flex-wrap gap-2">
        {areas.length === 0 ? (
          <AppText variant="bodySm" tone="muted">
            Pick a few focus areas to personalise your sessions.
          </AppText>
        ) : (
          areas.map((area) => <Chip key={area} label={area} />)
        )}
      </View>
    </Surface>
  );
}
