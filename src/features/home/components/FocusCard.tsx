import { Pressable, View } from "react-native";

import { Icon } from "@/components/icons";
import { AppText, Surface } from "@/components/ui";
import { colors } from "@/theme";

import type { FocusSession } from "../data/home-content";

export type FocusCardProps = {
  session: FocusSession;
  onStart: () => void;
};

/** "Up next" card: the session Eduvoice suggests continuing. */
export function FocusCard({ session, onStart }: FocusCardProps) {
  return (
    <Surface className="flex-1 p-4">
      <View className="flex-row items-start justify-between">
        <AppText variant="cardLabel" tone="soft">
          {session.label}
        </AppText>
        <View className="h-[34px] w-[34px] items-center justify-center rounded-[13px] bg-sky-tint">
          <Icon name={session.icon} size={17} color="#4275ad" />
        </View>
      </View>

      <AppText variant="cardTitle" className="mt-4">
        {session.title}
      </AppText>
      <AppText variant="bodySm" tone="muted" className="mt-1">
        {session.meta}
      </AppText>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${session.cta}: ${session.title}`}
        onPress={onStart}
        className="mt-4 self-start rounded-control bg-navy px-3.5 py-2"
        style={({ pressed }) => (pressed ? { opacity: 0.9 } : null)}
      >
        <AppText variant="label" tone="inverse" style={{ color: colors.white }}>
          {session.cta}
        </AppText>
      </Pressable>
    </Surface>
  );
}
