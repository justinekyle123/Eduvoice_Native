import Constants from "expo-constants";

const extra = (Constants.expoConfig?.extra ?? {}) as { apiUrl?: string };

/** Values that differ between environments live here rather than in features. */
export const appConfig = {
  name: "Eduvoice",
  tagline: "Voice-first learning, designed around you",
  /** Backend base URL; empty until the API exists (voice + chat services are stubbed). */
  apiUrl: process.env.EXPO_PUBLIC_API_URL ?? extra.apiUrl ?? "",
  requestTimeoutMs: 15_000,
} as const;
