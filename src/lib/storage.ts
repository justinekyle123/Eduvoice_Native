import { Platform } from "react-native";

// Cross-platform storage: localStorage on web, SecureStore on native
let SecureStore: any = null;

if (Platform.OS !== "web") {
  try {
    SecureStore = require("expo-secure-store");
  } catch {
    SecureStore = null;
  }
}

export const storage = {
  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === "web") {
      return localStorage.getItem(key);
    }
    if (SecureStore) {
      return SecureStore.getItemAsync(key);
    }
    return null;
  },

  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === "web") {
      localStorage.setItem(key, value);
      return;
    }
    if (SecureStore) {
      await SecureStore.setItemAsync(key, value);
    }
  },

  async removeItem(key: string): Promise<void> {
    if (Platform.OS === "web") {
      localStorage.removeItem(key);
      return;
    }
    if (SecureStore) {
      await SecureStore.deleteItemAsync(key);
    }
  },
};
