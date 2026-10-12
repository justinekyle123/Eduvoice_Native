import { Pressable, View } from "react-native";

import { Icon } from "@/components/icons";
import { AppText } from "@/components/ui";
import { formatRelativeTime } from "@/lib/utils/format";
import { colors, shadows } from "@/theme";

import { resourceKindMeta } from "../data/library";
import type { LibraryItem } from "../types";

export type ResourceCardProps = {
  item: LibraryItem;
  /** Provided only when the resource links to a conversation. */
  onOpen?: (item: LibraryItem) => void;
};

/** Row in the Library tab. Resources produced by a chat can be reopened. */
export function ResourceCard({ item, onOpen }: ResourceCardProps) {
  const kind = resourceKindMeta[item.kind];

  const body = (
    <>
      <View className={`h-10 w-10 items-center justify-center rounded-control ${kind.chipClassName}`}>
        <Icon name={kind.icon} size={18} color={kind.iconColor} />
      </View>

      <View className="flex-1">
        <AppText variant="labelLg" numberOfLines={1}>
          {item.title}
        </AppText>
        <AppText variant="bodySm" tone="muted" numberOfLines={1} className="mt-0.5">
          {item.meta}
        </AppText>
      </View>

      <View className="items-end gap-1">
        <AppText variant="caption" tone="soft">
          {formatRelativeTime(item.updatedAt)}
        </AppText>
        {onOpen ? (
          <Icon name="arrow" size={16} color={colors.muted.soft} />
        ) : (
          <AppText variant="cardLabel" tone="faint">
            Saved
          </AppText>
        )}
      </View>
    </>
  );

  if (!onOpen) {
    return (
      <View
        className="flex-row items-center gap-3 rounded-card border border-white/85 bg-white/50 p-4"
        style={shadows.soft}
      >
        {body}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open ${item.title}`}
      onPress={() => onOpen(item)}
      className="flex-row items-center gap-3 rounded-card border border-white/85 bg-white/60 p-4"
      style={({ pressed }) => [shadows.card, pressed ? { opacity: 0.9 } : null]}
    >
      {body}
    </Pressable>
  );
}
