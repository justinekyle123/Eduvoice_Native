import { useRouter } from "expo-router";
import { View } from "react-native";

import { FadeInUp } from "@/components/animation";
import { AppText, PrimaryButton, Screen } from "@/components/ui";

import { ConversationListItem } from "../components/ConversationListItem";
import { useChat } from "../hooks/useChat";

/** Chat tab: every conversation, newest first. */
export function ChatScreen() {
  const router = useRouter();
  const { conversations, status } = useChat();

  return (
    <Screen contentClassName="pb-28">
      <FadeInUp>
        <AppText variant="eyebrow" tone="accentInk">
          Your learning space
        </AppText>
        <AppText variant="title" className="mt-1.5">
          Conversations
        </AppText>
        <AppText variant="body" tone="muted" className="mt-1">
          Every question you've asked Eduvoice, saved and searchable.
        </AppText>
      </FadeInUp>

      <PrimaryButton
        label="Start a voice session"
        icon="microphone"
        className="mt-5"
        onPress={() => router.push("/voice")}
      />

      <View className="mt-5 gap-2.5">
        {status === "loading" ? (
          <AppText variant="bodySm" tone="soft" className="py-8 text-center">
            Loading your conversations...
          </AppText>
        ) : conversations.length === 0 ? (
          <View className="items-center rounded-card border border-white/85 bg-white/55 px-6 py-10">
            <AppText variant="cardTitle">Nothing here yet</AppText>
            <AppText variant="bodySm" tone="muted" className="mt-2 text-center">
              Tap the microphone above and ask your first question out loud.
            </AppText>
          </View>
        ) : (
          conversations.map((conversation) => (
            <ConversationListItem
              key={conversation.id}
              conversation={conversation}
              onPress={() => router.push({ pathname: "/conversation/[id]", params: { id: conversation.id } })}
            />
          ))
        )}
      </View>
    </Screen>
  );
}
