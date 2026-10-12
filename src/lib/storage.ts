import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Thin, fail-safe wrapper around AsyncStorage.
 *
 * Reads never throw: a corrupt or missing value resolves to the fallback so a
 * bad cache can never block app startup.
 */
const NAMESPACE = "eduvoice";

export const storageKeys = {
  onboarding: "onboarding/profile",
  conversations: "chat/conversations",
  voiceSettings: "voice/settings",
} as const;

export type StorageKey = (typeof storageKeys)[keyof typeof storageKeys];

const withNamespace = (key: StorageKey) => `${NAMESPACE}:${key}`;

export async function readJson<T>(key: StorageKey, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(withNamespace(key));
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (error) {
    console.warn(`[storage] failed to read "${key}"`, error);
    return fallback;
  }
}

export async function writeJson<T>(key: StorageKey, value: T): Promise<void> {
  try {
    await AsyncStorage.setItem(withNamespace(key), JSON.stringify(value));
  } catch (error) {
    console.warn(`[storage] failed to write "${key}"`, error);
  }
}

export async function removeKey(key: StorageKey): Promise<void> {
  try {
    await AsyncStorage.removeItem(withNamespace(key));
  } catch (error) {
    console.warn(`[storage] failed to remove "${key}"`, error);
  }
}
