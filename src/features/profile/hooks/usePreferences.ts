import { useCallback, useEffect, useState } from "react";

import { readJson, storageKeys, writeJson } from "@/lib/storage";

import { defaultPreferences, type Preferences } from "../types";

/** Persisted toggles shown on the profile screen. */
export function usePreferences() {
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    readJson<Preferences>(storageKeys.voiceSettings, defaultPreferences).then((stored) => {
      if (!active) return;
      setPreferences({ ...defaultPreferences, ...stored });
      setReady(true);
    });

    return () => {
      active = false;
    };
  }, []);

  const setPreference = useCallback(<K extends keyof Preferences>(key: K, value: Preferences[K]) => {
    setPreferences((current) => {
      const next = { ...current, [key]: value };
      void writeJson(storageKeys.voiceSettings, next);
      return next;
    });
  }, []);

  return { preferences, setPreference, ready };
}
