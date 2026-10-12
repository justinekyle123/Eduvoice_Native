import { Link, Stack } from "expo-router";
import { View } from "react-native";

import { AppText, Screen } from "@/components/ui";

export default function NotFoundRoute() {
  return (
    <Screen padded>
      <Stack.Screen options={{ title: "Not found" }} />
      <View className="flex-1 items-center justify-center gap-3">
        <AppText variant="heading">This page went quiet</AppText>
        <AppText variant="body" tone="muted" className="text-center">
          The screen you were looking for does not exist.
        </AppText>
        <Link href="/(tabs)" className="mt-2">
          <AppText variant="labelLg" tone="accent">
            Back to home
          </AppText>
        </Link>
      </View>
    </Screen>
  );
}
