import type { IconName } from "@/components/icons";

/** The six personalisation choices from the design. */
export type InterestId = "lessons" | "schedule" | "notes" | "summaries" | "reminders" | "other";

export type InterestTone = "mint" | "sky" | "gold" | "lavender" | "violet" | "neutral";

export type Interest = {
  id: InterestId;
  title: string;
  description: string;
  icon: IconName;
  tone: InterestTone;
};

export type OnboardingProfile = {
  /** Interests picked during onboarding; drives the home "up next" card. */
  interests: InterestId[];
  /** ISO timestamp once the flow has finished, `null` while unfinished. */
  completedAt: string | null;
};

/** `loading` until the stored profile has been read from disk. */
export type OnboardingStatus = "loading" | "ready";
