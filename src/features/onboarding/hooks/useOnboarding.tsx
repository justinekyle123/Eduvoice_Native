import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { DEFAULT_INTERESTS } from "../constants";
import { clearProfile, loadProfile, saveProfile } from "../storage";
import type { InterestId, OnboardingProfile, OnboardingStatus } from "../types";

type OnboardingContextValue = {
  status: OnboardingStatus;
  profile: OnboardingProfile;
  isComplete: boolean;
  toggleInterest: (id: InterestId) => void;
  /** Marks the flow as finished so the app boots straight into the tabs. */
  complete: () => Promise<void>;
  reset: () => Promise<void>;
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

/**
 * Owns the first-run profile (chosen interests + completion) and keeps it in
 * sync with storage.
 */
export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<OnboardingStatus>("loading");
  const [profile, setProfile] = useState<OnboardingProfile>({ interests: DEFAULT_INTERESTS, completedAt: null });

  useEffect(() => {
    let active = true;

    loadProfile().then((stored) => {
      if (!active) return;
      setProfile(stored);
      setStatus("ready");
    });

    return () => {
      active = false;
    };
  }, []);

  const toggleInterest = useCallback((id: InterestId) => {
    setProfile((current) => {
      const interests = current.interests.includes(id)
        ? current.interests.filter((item) => item !== id)
        : [...current.interests, id];
      const next = { ...current, interests };
      void saveProfile(next);
      return next;
    });
  }, []);

  const complete = useCallback(async () => {
    const next: OnboardingProfile = { ...profile, completedAt: new Date().toISOString() };
    setProfile(next);
    await saveProfile(next);
  }, [profile]);

  const reset = useCallback(async () => {
    const next = { interests: DEFAULT_INTERESTS, completedAt: null };
    setProfile(next);
    await clearProfile();
  }, []);

  const value = useMemo<OnboardingContextValue>(
    () => ({
      status,
      profile,
      isComplete: Boolean(profile.completedAt),
      toggleInterest,
      complete,
      reset,
    }),
    [complete, profile, reset, status, toggleInterest],
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding(): OnboardingContextValue {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used inside <OnboardingProvider>");
  }
  return context;
}
