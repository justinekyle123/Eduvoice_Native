import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { colors, typography } from "../../lib/theme";

function TabIcon({ emoji, label, focused }: { emoji: string; label: string; focused: boolean }) {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", width: 64 }}>
      <Text style={{ fontSize: 24, marginBottom: 2 }}>{emoji}</Text>
      <Text
        style={{
          fontSize: 11,
          fontWeight: focused ? "600" : "400",
          color: focused ? colors.secondary : colors.onSurfaceVariant,
        }}
      >
        {label}
      </Text>
      {focused && (
        <View
          style={{
            width: 4,
            height: 4,
            borderRadius: 2,
            backgroundColor: colors.secondary,
            marginTop: 2,
          }}
        />
      )}
    </View>
  );
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: colors.surfaceContainerLowest,
          borderTopWidth: 0,
          height: 80,
          paddingTop: 8,
          paddingBottom: 12,
          elevation: 0,
          shadowColor: "#04162e",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.06,
          shadowRadius: 24,
        },
        tabBarLabel: () => null,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Feed",
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🏠" label="Feed" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="prayers"
        options={{
          title: "Prayer",
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="🙏" label="Prayer" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="events"
        options={{
          title: "Events",
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="📅" label="Events" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="💬" label="Chat" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon emoji="👤" label="Profile" focused={focused} />
          ),
          href: null,
        }}
      />
    </Tabs>
  );
}
