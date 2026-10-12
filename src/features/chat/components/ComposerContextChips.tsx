import { Pressable, View } from "react-native";

import { Icon } from "@/components/icons";
import { AppText } from "@/components/ui";
import { colors } from "@/theme";

import type { Attachment, LearningMode } from "../types";

export type ComposerContextChipsProps = {
  mode: LearningMode | null;
  attachments: Attachment[];
  onClearMode: () => void;
  onRemoveAttachment: (id: string) => void;
};

/** Shows what the next message will be sent with (mode + files). */
export function ComposerContextChips({
  mode,
  attachments,
  onClearMode,
  onRemoveAttachment,
}: ComposerContextChipsProps) {
  if (!mode && attachments.length === 0) return null;

  return (
    <View className="mb-2 flex-row flex-wrap gap-1.5 px-3">
      {mode ? (
        <ContextChip icon={mode.icon} label={`${mode.name} mode`} onRemove={onClearMode} />
      ) : null}
      {attachments.map((attachment) => (
        <ContextChip
          key={attachment.id}
          icon="paperclip"
          label={attachment.name}
          onRemove={() => onRemoveAttachment(attachment.id)}
        />
      ))}
    </View>
  );
}

function ContextChip({
  icon,
  label,
  onRemove,
}: {
  icon: React.ComponentProps<typeof Icon>["name"];
  label: string;
  onRemove: () => void;
}) {
  return (
    <View className="max-w-[240px] flex-row items-center gap-1.5 rounded-[12px] border border-white/85 bg-[#edf5fd]/90 px-2 py-1.5">
      <Icon name={icon} size={13} color={colors.accent.ink} />
      <AppText variant="label" tone="accentInk" numberOfLines={1} className="flex-shrink">
        {label}
      </AppText>
      <Pressable accessibilityRole="button" accessibilityLabel={`Remove ${label}`} onPress={onRemove}>
        <Icon name="close" size={12} color={colors.muted.base} />
      </Pressable>
    </View>
  );
}
