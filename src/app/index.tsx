import { Redirect } from "expo-router";

import { AppLoading } from "@/components/ui";
import { useOnboarding } from "@/features/onboarding";

/**
 * Entry point. Waits for the stored profile, then sends first-time users to
 * onboarding and everyone else straight into the tabs.
 */
export default function IndexRoute() {
  const { status, isComplete } = useOnboarding();

  if (status === "loading") {
    return <AppLoading />;
  }

  return <Redirect href={isComplete ? "/(tabs)" : "/(onboarding)/welcome"} />;
}
