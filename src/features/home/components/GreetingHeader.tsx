import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";

import { AppText, Avatar } from "@/components/ui";
import { getGreeting } from "@/lib/utils/format";

export type GreetingHeaderProps = {
  name: string;
};

/** "Good morning, Alex." plus the profile avatar shortcut. */
export function GreetingHeader({ name }: GreetingHeaderProps) {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-1">
        <AppText variant="eyebrow" tone="accentInk">
          Your learning space
        </AppText>
        <AppText variant="title" className="mt-1.5">
          {`${getGreeting()}, ${name}.`}
        </AppText>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Open profile"
        onPress={() => router.push("/(tabs)/profile")}
      >
        <Avatar name={name} />
      </Pressable>
    </View>
  );
}
