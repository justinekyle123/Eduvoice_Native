import type { ReactNode } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ChatProvider } from "@/features/chat";
import { OnboardingProvider } from "@/features/onboarding";

/**
 * Every app-wide provider in one place, mounted above the router so screens can
 * read onboarding state and conversations anywhere.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <OnboardingProvider>
          <ChatProvider>{children}</ChatProvider>
        </OnboardingProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
