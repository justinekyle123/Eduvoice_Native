import { Stack } from "expo-router";

/** Onboarding is a short, gesture-locked stack. */
export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: "fade",
        gestureEnabled: false,
      }}
    />
  );
}
