import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { View } from "react-native";

import { FadeInUp } from "@/components/animation";
import { AppText, Screen } from "@/components/ui";

import { LibraryFilters } from "../components/LibraryFilters";
import { ResourceCard } from "../components/ResourceCard";
import { seedLibraryItems } from "../data/library";
import type { LibraryItem, ResourceFilter } from "../types";

/** Library tab: notes, audio, summaries and quizzes saved from sessions. */
export function LibraryScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<ResourceFilter>("all");
  const items = useMemo(() => seedLibraryItems(), []);

  const visible = filter === "all" ? items : items.filter((item) => item.kind === filter);

  const openResource = (item: LibraryItem) => {
    if (!item.conversationId) return;
    router.push({ pathname: "/conversation/[id]", params: { id: item.conversationId } });
  };

  return (
    <Screen contentClassName="pb-28">
      <FadeInUp>
        <AppText variant="eyebrow" tone="accentInk">
          Saved for you
        </AppText>
        <AppText variant="title" className="mt-1.5">
          Library
        </AppText>
        <AppText variant="body" tone="muted" className="mt-1">
          Everything Eduvoice wrote, recorded or planned for you.
        </AppText>
      </FadeInUp>

      <View className="mt-4">
        <LibraryFilters active={filter} onChange={setFilter} />
      </View>

      <View className="mt-4 gap-2.5">
        {visible.length === 0 ? (
          <View className="items-center rounded-card border border-white/85 bg-white/55 px-6 py-10">
            <AppText variant="cardTitle">Nothing in this filter yet</AppText>
            <AppText variant="bodySm" tone="muted" className="mt-2 text-center">
              Start a session and Eduvoice will keep the highlights here.
            </AppText>
          </View>
        ) : (
          visible.map((item) => (
            <ResourceCard key={item.id} item={item} onOpen={item.conversationId ? openResource : undefined} />
          ))
        )}
      </View>
    </Screen>
  );
}
