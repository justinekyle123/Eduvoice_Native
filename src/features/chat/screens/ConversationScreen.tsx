import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppBackground, AppText, IconButton } from "@/components/ui";

import { Composer, type ComposerSubmitPayload } from "../components/Composer";
import { MessageBubble, TypingBubble } from "../components/MessageBubble";
import { useChat } from "../hooks/useChat";

/** Thread view for a single conversation, with the composer pinned to the bottom. */
export function ConversationScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getConversation, sendMessage, isTyping, status } = useChat();
  const scrollRef = useRef<ScrollView>(null);
  const [failedId, setFailedId] = useState<string | null>(null);

  const conversation = getConversation(id);
  const typing = id ? isTyping(id) : false;

  const scrollToEnd = useCallback(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, []);

  const handleSubmit = useCallback(
    ({ text, mode, attachments }: ComposerSubmitPayload) => {
      if (!id || !conversation) {
        setFailedId(id ?? "unknown");
        return;
      }
      void sendMessage(id, { text, mode, attachments });
      scrollToEnd();
    },
    [conversation, id, scrollToEnd, sendMessage],
  );

  const missing = status === "ready" && (!conversation || failedId === id);

  return (
    <View className="flex-1">
      <AppBackground />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
      >
        <SafeAreaView className="flex-1" edges={["top"]}>
          <View className="flex-row items-center gap-3 px-5 pb-3 pt-1">
            <IconButton name="chevron" onPress={() => router.back()} accessibilityLabel="Go back" />
            <View className="flex-1">
              <AppText variant="labelLg" numberOfLines={1}>
                {conversation?.title ?? "Conversation"}
              </AppText>
              <AppText variant="caption" tone="soft">
                {conversation ? `${conversation.messages.length} messages` : "Not found"}
              </AppText>
            </View>
          </View>

          <ScrollView
            ref={scrollRef}
            className="flex-1"
            contentContainerClassName="gap-3 px-5 pb-4"
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            onContentSizeChange={scrollToEnd}
          >
            {missing ? (
              <View className="items-center rounded-card border border-white/85 bg-white/55 px-6 py-10">
                <AppText variant="cardTitle">This conversation is gone</AppText>
                <AppText variant="bodySm" tone="muted" className="mt-2 text-center">
                  It may have been removed from this device. Start a new voice session from the Chat tab.
                </AppText>
              </View>
            ) : null}

            {conversation?.messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}

            {typing ? <TypingBubble /> : null}
          </ScrollView>

          <SafeAreaView edges={["bottom"]} className="px-5 pb-1 pt-2">
            <Composer onSubmit={handleSubmit} />
          </SafeAreaView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}
