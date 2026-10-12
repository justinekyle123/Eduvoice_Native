import { Pressable, View } from "react-native";

import { Icon } from "@/components/icons";
import { AppText } from "@/components/ui";
import { formatRelativeTime } from "@/lib/utils/format";
import { colors, shadows } from "@/theme";

import type { Conversation } from "../types";

export type ConversationListItemProps = {
  conversation: Conversation;
  onPress: (conversation: Conversation) => void;
};

/** Card in the Chat tab: title, last turn preview and a voice badge. */
export function ConversationListItem({ conversation, onPress }: ConversationListItemProps) {
  const lastMessage = conversation.messages[conversation.messages.length - 1];
  const startedByVoice = conversation.messages.some((message) => message.source === "voice");

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open conversation ${conversation.title}`}
      onPress={() => onPress(conversation)}
      className="flex-row items-center gap-3 rounded-card border border-white/85 bg-white/60 p-4"
      style={({ pressed }) => [shadows.card, pressed ? { opacity: 0.9 } : null]}
    >
      <View className="h-10 w-10 items-center justify-center rounded-control bg-sky-tint">
        <Icon name={startedByVoice ? "microphone" : "message"} size={18} color="#316cac" />
      </View>

      <View className="flex-1">
        <View className="flex-row items-center gap-2">
          <AppText variant="labelLg" numberOfLines={1} className="flex-shrink">
            {conversation.title}
          </AppText>
        </View>
        <AppText variant="bodySm" tone="muted" numberOfLines={1} className="mt-0.5">
          {lastMessage ? (lastMessage.role === "user" ? "You: " : "") + lastMessage.text : "No messages yet"}
        </AppText>
      </View>

      <View className="items-end gap-1">
        <AppText variant="caption" tone="soft">
          {formatRelativeTime(conversation.updatedAt)}
        </AppText>
        <Icon name="arrow" size={16} color={colors.muted.soft} />
      </View>
    </Pressable>
  );
}
