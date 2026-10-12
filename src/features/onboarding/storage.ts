import { readJson, removeKey, storageKeys, writeJson } from "@/lib/storage";

import { DEFAULT_INTERESTS } from "./constants";
import type { OnboardingProfile } from "./types";

const emptyProfile: OnboardingProfile = { interests: DEFAULT_INTERESTS, completedAt: null };

export function loadProfile(): Promise<OnboardingProfile> {
  return readJson<OnboardingProfile>(storageKeys.onboarding, emptyProfile);
}

export function saveProfile(profile: OnboardingProfile): Promise<void> {
  return writeJson(storageKeys.onboarding, profile);
}

export function clearProfile(): Promise<void> {
  return removeKey(storageKeys.onboarding);
}
