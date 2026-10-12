import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { readJson, storageKeys, writeJson } from "@/lib/storage";
import { createId } from "@/lib/utils/id";

import { deriveTitle } from "../constants";
import { createSeedConversations } from "../data/seed";
import { requestAssistantReply } from "../services/chat-service";
import type { Attachment, ChatMessage, Conversation, LearningModeId, MessageSource } from "../types";

export type SendMessageInput = {
  text: string;
  source?: MessageSource;
  mode?: LearningModeId;
  attachments?: Attachment[];
};

type ChatContextValue = {
  status: "loading" | "ready";
  /** Newest first, which is the order the chat list renders. */
  conversations: Conversation[];
  getConversation: (id: string | undefined) => Conversation | undefined;
  isTyping: (conversationId: string) => boolean;
  /** Creates a conversation, sends the first turn and resolves with its id. */
  startConversation: (input: SendMessageInput) => Promise<string>;
  sendMessage: (conversationId: string, input: SendMessageInput) => Promise<void>;
};

export const ChatContext = createContext<ChatContextValue | null>(null);

const sortConversations = (items: Conversation[]) => [...items].sort((a, b) => b.updatedAt - a.updatedAt);

/** Holds conversations, mirrors them to storage and runs the assistant loop. */
export function ChatProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<"loading" | "ready">("loading");
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [typingIds, setTypingIds] = useState<string[]>([]);
  const hydrated = useRef(false);

  useEffect(() => {
    let active = true;

    readJson<Conversation[]>(storageKeys.conversations, []).then((stored) => {
      if (!active) return;
      setConversations(sortConversations(stored.length > 0 ? stored : createSeedConversations()));
      hydrated.current = true;
      setStatus("ready");
    });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    void writeJson(storageKeys.conversations, conversations);
  }, [conversations]);

  const appendMessage = useCallback((message: ChatMessage) => {
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === message.conversationId
          ? { ...conversation, messages: [...conversation.messages, message], updatedAt: message.createdAt }
          : conversation,
      ),
    );
  }, []);

  const runAssistant = useCallback(
    async (conversationId: string, input: SendMessageInput) => {
      setTypingIds((current) => (current.includes(conversationId) ? current : [...current, conversationId]));

      const reply = await requestAssistantReply({
        prompt: input.text,
        mode: input.mode,
        attachments: input.attachments,
      });

      appendMessage({
        id: createId("assistant"),
        conversationId,
        role: "assistant",
        text: reply,
        createdAt: Date.now(),
        source: "text",
      });
      setTypingIds((current) => current.filter((id) => id !== conversationId));
    },
    [appendMessage],
  );

  const sendMessage = useCallback(
    async (conversationId: string, input: SendMessageInput) => {
      const text = input.text.trim();
      if (!text) return;

      const createdAt = Date.now();
      appendMessage({
        id: createId("user"),
        conversationId,
        role: "user",
        text,
        createdAt,
        source: input.source ?? "text",
      });

      setConversations((current) =>
        sortConversations(
          current.map((conversation) =>
            conversation.id === conversationId && conversation.title === "New conversation"
              ? { ...conversation, title: deriveTitle(text) }
              : conversation,
          ),
        ),
      );

      await runAssistant(conversationId, { ...input, text });
    },
    [appendMessage, runAssistant],
  );

  const startConversation = useCallback(
    async (input: SendMessageInput) => {
      const createdAt = Date.now();
      const conversationId = createId("conversation");
      const conversation: Conversation = {
        id: conversationId,
        title: deriveTitle(input.text.trim()) || "New conversation",
        createdAt,
        updatedAt: createdAt,
        messages: [],
      };

      setConversations((current) => sortConversations([conversation, ...current]));
      await sendMessage(conversationId, input);
      return conversationId;
    },
    [sendMessage],
  );

  const value = useMemo<ChatContextValue>(
    () => ({
      status,
      conversations,
      getConversation: (id) => (id ? conversations.find((conversation) => conversation.id === id) : undefined),
      isTyping: (conversationId) => typingIds.includes(conversationId),
      startConversation,
      sendMessage,
    }),
    [conversations, sendMessage, startConversation, status, typingIds],
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}
