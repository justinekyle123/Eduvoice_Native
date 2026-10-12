import { TabList, TabSlot, TabTrigger, Tabs } from "expo-router/ui";

import { FloatingTabBar } from "@/components/navigation";

/**
 * Custom (headless) tabs so the bar can match the design's floating pill with a
 * centre voice button. The `TabList` defines the routes and stays hidden; the
 * visible bar renders its own `TabTrigger`s.
 */
export default function TabsLayout() {
  return (
    <Tabs>
      <TabSlot />
      <FloatingTabBar />
      <TabList style={{ display: "none" }}>
        <TabTrigger name="home" href="/" />
        <TabTrigger name="chat" href="/chat" />
        <TabTrigger name="library" href="/library" />
        <TabTrigger name="profile" href="/profile" />
      </TabList>
    </Tabs>
  );
}
