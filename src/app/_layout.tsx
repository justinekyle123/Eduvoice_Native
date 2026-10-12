import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/manrope";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform } from "react-native";

import { AppProviders } from "@/providers";
import { colors } from "@/theme";

import "../../global.css";

void SplashScreen.preventAutoHideAsync();

/** Root navigator: onboarding, the tab shell, voice mode and conversation threads. */
export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  const fontsReady = fontsLoaded || Boolean(fontError);

  useEffect(() => {
    if (fontsReady) {
      void SplashScreen.hideAsync();
    }
  }, [fontsReady]);

  // Native holds the splash until Manrope is ready so the first frame never
  // flashes a fallback font. The web build renders straight away, which also
  // keeps the static export's HTML meaningful.
  if (!fontsReady && Platform.OS !== "web") {
    return null;
  }

  return (
    <AppProviders>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.shell.base },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(onboarding)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="voice" options={{ presentation: "fullScreenModal", animation: "fade" }} />
        <Stack.Screen name="conversation/[id]" />
        <Stack.Screen name="+not-found" options={{ headerShown: true, title: "Not found" }} />
      </Stack>
    </AppProviders>
  );
}
