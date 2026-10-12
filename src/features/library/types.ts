import type { IconName } from "@/components/icons";

export type ResourceKind = "note" | "audio" | "summary" | "quiz";

export type ResourceFilter = "all" | ResourceKind;

export type LibraryItem = {
  id: string;
  title: string;
  /** Short context line, e.g. where it came from. */
  meta: string;
  kind: ResourceKind;
  updatedAt: number;
  /** Links the resource back to the conversation that produced it. */
  conversationId?: string;
};

export type ResourceKindMeta = {
  label: string;
  icon: IconName;
  /** Tailwind classes for the icon chip. */
  chipClassName: string;
  iconColor: string;
};
