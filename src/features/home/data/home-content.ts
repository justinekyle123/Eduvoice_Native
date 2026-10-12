import type { IconName } from "@/components/icons";

export type FocusSession = {
  label: string;
  title: string;
  meta: string;
  icon: IconName;
  cta: string;
};

export type StreakSummary = {
  label: string;
  days: number;
  caption: string;
  /** Seven flags, oldest first. */
  week: boolean[];
};

/**
 * Static home content until progress tracking exists. Kept in one place so the
 * screens stay presentational.
 */
export const focusSession: FocusSession = {
  label: "Up next",
  title: "Biology review",
  meta: "Cell structure · 20 min",
  icon: "book",
  cta: "Start session",
};

export const streakSummary: StreakSummary = {
  label: "This week",
  days: 4,
  caption: "day learning streak",
  week: [true, true, true, true, false, false, false],
};
