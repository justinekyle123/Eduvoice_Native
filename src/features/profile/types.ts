export type Preferences = {
  /** Read Eduvoice's replies out loud. */
  spokenReplies: boolean;
  /** Daily nudge to keep a study streak alive. */
  dailyReminder: boolean;
};

export const defaultPreferences: Preferences = {
  spokenReplies: true,
  dailyReminder: false,
};
