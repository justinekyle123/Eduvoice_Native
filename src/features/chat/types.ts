import type { IconName } from "@/components/icons";

export type ChatRole = "user" | "assistant";

export type MessageSource = "text" | "voice";

export type ChatMessage = {
  id: string;
  conversationId: string;
  role: ChatRole;
  text: string;
  createdAt: number;
  /** Voice turns are badged in the thread so the history stays readable. */
  source: MessageSource;
};

export type Conversation = {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  messages: ChatMessage[];
};

/** "Learning mode" options offered by the composer menu. */
export type LearningModeId = "debate" | "hint" | "interview";

export type LearningMode = {
  id: LearningModeId;
  name: string;
  description: string;
  icon: IconName;
};

export type Attachment = {
  id: string;
  name: string;
  /** Only metadata is stored until file upload is wired up. */
  kind: "file" | "image";
};
