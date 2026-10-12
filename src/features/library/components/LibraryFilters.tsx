import { ScrollView } from "react-native";

import { Chip } from "@/components/ui";

import { resourceKindMeta } from "../data/library";
import type { ResourceFilter } from "../types";

const FILTERS: ResourceFilter[] = ["all", "note", "audio", "summary", "quiz"];

export type LibraryFiltersProps = {
  active: ResourceFilter;
  onChange: (filter: ResourceFilter) => void;
};

/** Horizontal filter row for the library. */
export function LibraryFilters({ active, onChange }: LibraryFiltersProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2 pr-4"
      className="-mx-5 px-5"
    >
      {FILTERS.map((filter) => (
        <Chip
          key={filter}
          label={filter === "all" ? "All" : resourceKindMeta[filter].label}
          selected={filter === active}
          onPress={() => onChange(filter)}
        />
      ))}
    </ScrollView>
  );
}
