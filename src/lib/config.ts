import { Platform } from "react-native";
import Constants from "expo-constants";

// Use localhost for web, IP address for native
const getApiUrl = () => {
  // Check if running on web
  if (Platform.OS === "web") {
    return "http://localhost:3001";
  }
  // For native (iOS/Android), use the configured URL from app.json
  return (Constants.expoConfig?.extra?.apiUrl as string) || "http://localhost:3001";
};

export const API_BASE_URL = getApiUrl();
