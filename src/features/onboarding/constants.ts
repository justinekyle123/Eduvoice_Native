import type { Interest, InterestId } from "./types";

export const INTERESTS: Interest[] = [
  {
    id: "lessons",
    title: "Plan lessons",
    description: "Build a study plan",
    icon: "book",
    tone: "mint",
  },
  {
    id: "schedule",
    title: "Schedule study",
    description: "Make time to learn",
    icon: "calendar",
    tone: "sky",
  },
  {
    id: "notes",
    title: "Review notes",
    description: "Turn notes into audio",
    icon: "document",
    tone: "gold",
  },
  {
    id: "summaries",
    title: "Summarize topics",
    description: "Keep the key ideas",
    icon: "sparkles",
    tone: "lavender",
  },
  {
    id: "reminders",
    title: "Set reminders",
    description: "Stay on track",
    icon: "clock",
    tone: "violet",
  },
  {
    id: "other",
    title: "Something else",
    description: "Make it your own",
    icon: "plus",
    tone: "neutral",
  },
];

export const interestById = INTERESTS.reduce<Record<string, Interest>>((map, interest) => {
  map[interest.id] = interest;
  return map;
}, {});

export const DEFAULT_INTERESTS: InterestId[] = ["lessons"];

export const ONBOARDING_STEP_COUNT = 3;

/** How long the "getting ready" screen stays on screen before entering the app. */
export const PREPARING_DURATION_MS = 2_600;
