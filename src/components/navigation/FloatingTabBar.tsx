import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { TabTrigger } from "expo-router/ui";
import { Pressable, View } from "react-native";

import { Icon } from "@/components/icons";
import { AppText, GlassSurface } from "@/components/ui";
import { colors, gradients, radius, shadows } from "@/theme";

import { TabBarButton } from "./TabBarButton";

/**
 * Floating pill navigation from the design: four tabs with an elevated voice
 * button in the middle. The tabs themselves are `TabTrigger`s, so routing and
 * focus state stay with the router.
 */
export function FloatingTabBar() {
  const router = useRouter();

  return (
    <View pointerEvents="box-none" className="absolute bottom-3 left-0 right-0 items-center px-4">
      <GlassSurface
        radiusToken="card"
        className="h-[68px] w-full max-w-[520px] flex-row items-center px-2"
      >
        <TabTrigger name="home" asChild>
          <TabBarButton label="Home" icon="home" />
        </TabTrigger>
        <TabTrigger name="chat" asChild>
          <TabBarButton label="Chat" icon="message" />
        </TabTrigger>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Start voice mode"
          onPress={() => router.push("/voice")}
          className="mx-1 items-center justify-center overflow-hidden"
          style={({ pressed }) => [
            {
              width: 58,
              height: 58,
              borderRadius: radius.pill,
              borderWidth: 4,
              borderColor: "#eff3fa",
              marginTop: -22,
              // Opaque backing so the mic's shadow paints on iOS.
              backgroundColor: "#7169cf",
            },
            shadows.raised,
            pressed ? { opacity: 0.92 } : null,
          ]}
        >
          <LinearGradient
            colors={gradients.tabMic.colors}
            start={gradients.tabMic.start}
            end={gradients.tabMic.end}
            style={{ flex: 1, alignSelf: "stretch", alignItems: "center", justifyContent: "center" }}
          >
            <Icon name="microphone" size={23} color={colors.white} />
          </LinearGradient>
        </Pressable>

        <TabTrigger name="library" asChild>
          <TabBarButton label="Library" icon="book" />
        </TabTrigger>
        <TabTrigger name="profile" asChild>
          <TabBarButton label="Profile" icon="user" />
        </TabTrigger>
      </GlassSurface>

      <AppText variant="cardLabel" tone="faint" className="mt-2">
        Voice-first learning, designed around you
      </AppText>
    </View>
  );
}
