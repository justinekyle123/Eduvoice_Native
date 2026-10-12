import type { LearningMode } from "./types";

export const LEARNING_MODES: LearningMode[] = [
  { id: "debate", name: "Debate", description: "Challenge your point of view", icon: "users" },
  { id: "hint", name: "Hint", description: "Get nudges, not answers", icon: "lightbulb" },
  { id: "interview", name: "Interview", description: "Practice with live questions", icon: "briefcase" },
];

export const learningModeById = LEARNING_MODES.reduce<Record<string, LearningMode>>((map, mode) => {
  map[mode.id] = mode;
  return map;
}, {});

export const PLACEHOLDER_DEFAULT = "Ask Eduvoice anything...";

export const placeholderForMode = (mode: LearningMode | null) =>
  mode ? `Ask in ${mode.name.toLowerCase()} mode...` : PLACEHOLDER_DEFAULT;

/** Conversation titles are derived from the first utterance. */
export const deriveTitle = (text: string, maxLength = 42) =>
  text.length > maxLength ? `${text.slice(0, maxLength).trimEnd()}...` : text;
