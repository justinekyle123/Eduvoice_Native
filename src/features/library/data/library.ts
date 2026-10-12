import type { ResourceKind, ResourceKindMeta } from "../types";

const HOUR = 60 * 60 * 1000;

export const resourceKindMeta: Record<ResourceKind, ResourceKindMeta> = {
  note: { label: "Note", icon: "document", chipClassName: "bg-sky-tint", iconColor: "#316cac" },
  audio: { label: "Audio", icon: "waveform", chipClassName: "bg-lavender-tint", iconColor: "#5f5c99" },
  summary: { label: "Summary", icon: "sparkles", chipClassName: "bg-mint-tint", iconColor: "#197b66" },
  quiz: { label: "Quiz", icon: "checkCircle", chipClassName: "bg-gold-tint", iconColor: "#a87513" },
};

/** Stand-in library content; real items will be saved from conversations. */
export const seedLibraryItems = (now: number = Date.now()) => [
  {
    id: "lib-1",
    title: "Photosynthesis, in your own words",
    meta: "From your voice session · 2 min read",
    kind: "note" as const,
    updatedAt: now - 3 * HOUR,
    conversationId: "seed-photosynthesis",
  },
  {
    id: "lib-2",
    title: "Cell structure quiz - 5 questions",
    meta: "Hint mode · 5 questions",
    kind: "quiz" as const,
    updatedAt: now - 26 * HOUR,
    conversationId: "seed-cell-structure",
  },
  {
    id: "lib-3",
    title: "Cell biology summary",
    meta: "Generated summary · 1 min listen",
    kind: "audio" as const,
    updatedAt: now - 26 * HOUR - 60_000,
    conversationId: "seed-cell-structure",
  },
  {
    id: "lib-4",
    title: "Week 3 study plan",
    meta: "Saved plan · 3 sessions",
    kind: "summary" as const,
    updatedAt: now - 4 * 24 * HOUR,
  },
  {
    id: "lib-5",
    title: "Exam revision checklist",
    meta: "Note · 8 items",
    kind: "note" as const,
    updatedAt: now - 6 * 24 * HOUR,
  },
];
