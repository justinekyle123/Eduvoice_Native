import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

import { Icon } from "@/components/icons";
import { AppText } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import { colors, radius, shadows } from "@/theme";

import type { ChatMessage } from "../types";

export type MessageBubbleProps = {
  message: ChatMessage;
};

/** User turns sit right in navy; Eduvoice's replies sit left on frosted white. */
export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <View className={cn("flex-row", isUser ? "justify-end" : "justify-start")}>
      <View
        className={cn("max-w-[86%] overflow-hidden rounded-[20px]")}
        // The navy backing keeps the iOS shadow visible under the gradient.
        style={isUser ? [shadows.soft, { backgroundColor: colors.navy.deep }] : shadows.card}
      >
        {isUser ? (
          <LinearGradient
            colors={[colors.navy.mid, colors.navy.deep]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ paddingHorizontal: 16, paddingVertical: 12 }}
          >
            <BubbleBody message={message} />
          </LinearGradient>
        ) : (
          <View className="border border-white/90 bg-white/70 px-4 py-3">
            <BubbleBody message={message} />
          </View>
        )}
      </View>
    </View>
  );
}

function BubbleBody({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";

  return (
    <>
      {message.source === "voice" ? (
        <View className="mb-1.5 flex-row items-center gap-1.5">
          <Icon name="microphone" size={11} color={isUser ? "rgba(255,255,255,0.8)" : colors.accent.ink} />
          <AppText variant="cardLabel" tone={isUser ? "inverse" : "accentInk"} style={{ opacity: 0.85 }}>
            Voice
          </AppText>
        </View>
      ) : null}
      <AppText variant="body" tone={isUser ? "inverse" : "inkStrong"}>
        {message.text}
      </AppText>
    </>
  );
}

/** Three-dot placeholder while the assistant is composing a reply. */
export function TypingBubble() {
  return (
    <View className="flex-row justify-start">
      <View
        className="flex-row items-center gap-1.5 rounded-[20px] border border-white/90 bg-white/70 px-4 py-3"
        style={shadows.card}
      >
        {[0, 1, 2].map((dot) => (
          <View
            key={dot}
            style={{
              width: 6,
              height: 6,
              borderRadius: radius.pill,
              backgroundColor: colors.accent.soft,
              opacity: 0.4 + dot * 0.25,
            }}
          />
        ))}
        <AppText variant="caption" tone="soft" className="ml-1">
          Eduvoice is thinking
        </AppText>
      </View>
    </View>
  );
}
