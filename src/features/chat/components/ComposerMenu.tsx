import { Pressable, View } from "react-native";

import { Icon } from "@/components/icons";
import { AppText } from "@/components/ui";
import { cn } from "@/lib/utils/cn";
import { colors, shadows } from "@/theme";

import { LEARNING_MODES } from "../constants";
import type { LearningMode, LearningModeId } from "../types";

export type ComposerMenuProps = {
  modeId: LearningModeId | null;
  onSelectMode: (mode: LearningMode) => void;
  onClearMode: () => void;
  onUploadPress: () => void;
  /** File upload is not wired to a picker yet. */
  uploadDisabled?: boolean;
};

/** Popover with the upload entry point and the learning-mode picker. */
export function ComposerMenu({
  modeId,
  onSelectMode,
  onClearMode,
  onUploadPress,
  uploadDisabled = true,
}: ComposerMenuProps) {
  return (
    <View
      className="border border-white/95 bg-[#fafcff]/95 p-2.5"
      style={[{ borderRadius: 22 }, shadows.raised]}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Upload a file"
        accessibilityState={{ disabled: uploadDisabled }}
        disabled={uploadDisabled}
        onPress={onUploadPress}
        className={cn(
          "flex-row items-center gap-2.5 rounded-sm p-2.5",
          uploadDisabled ? "opacity-60" : "bg-[#edf3fa]",
        )}
      >
        <View className="h-9 w-9 items-center justify-center rounded-[11px] bg-sky-tint">
          <Icon name="upload" size={17} color="#3970a8" />
        </View>
        <View className="flex-1">
          <AppText variant="label">Upload a file</AppText>
          <AppText variant="caption" tone="soft" className="mt-0.5">
            PDF, image, notes, or document
          </AppText>
        </View>
        <AppText variant="cardLabel" tone="soft">
          Soon
        </AppText>
      </Pressable>

      <View className="mx-2 mb-1 mt-2 flex-row items-center justify-between">
        <AppText variant="cardLabel" tone="soft">
          Learning mode
        </AppText>
        {modeId ? (
          <Pressable accessibilityRole="button" accessibilityLabel="Clear learning mode" onPress={onClearMode}>
            <AppText variant="cardLabel" tone="accentInk">
              Clear
            </AppText>
          </Pressable>
        ) : null}
      </View>

      {LEARNING_MODES.map((mode) => {
        const selected = mode.id === modeId;
        return (
          <Pressable
            key={mode.id}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            onPress={() => onSelectMode(mode)}
            className={cn(
              "flex-row items-center gap-2.5 rounded-sm p-2.5",
              selected ? "bg-[#edf3fa]" : null,
            )}
          >
            <View className="h-9 w-9 items-center justify-center rounded-[11px] bg-[#e4e8f7]">
              <Icon name={mode.icon} size={16} color="#606da2" />
            </View>
            <View className="flex-1">
              <AppText variant="label">{mode.name}</AppText>
              <AppText variant="caption" tone="soft" className="mt-0.5">
                {mode.description}
              </AppText>
            </View>
            {selected ? <Icon name="check" size={15} color={colors.accent.deep} /> : null}
          </Pressable>
        );
      })}
    </View>
  );
}