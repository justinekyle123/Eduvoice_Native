import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";

import { Icon } from "@/components/icons";
import { colors, shadows } from "@/theme";

import { placeholderForMode } from "../constants";
import type { Attachment, LearningMode } from "../types";
import { ComposerContextChips } from "./ComposerContextChips";
import { ComposerMenu } from "./ComposerMenu";

export type ComposerSubmitPayload = {
  text: string;
  mode?: LearningMode["id"];
  attachments: Attachment[];
};

export type ComposerProps = {
  onSubmit: (payload: ComposerSubmitPayload) => void;
  /** Overrides the mode-aware placeholder. */
  placeholder?: string;
  autoFocus?: boolean;
  className?: string;
};

/**
 * The prompt bar from the design: add button, input, send, plus the popover with
 * upload and learning modes. Mode selection lives here so both the home screen
 * and a conversation thread behave identically.
 */
export function Composer({ onSubmit, placeholder, autoFocus = false, className }: ComposerProps) {
  const [text, setText] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [mode, setMode] = useState<LearningMode | null>(null);
  const [attachments] = useState<Attachment[]>([]);

  const canSend = text.trim().length > 0;

  const submit = () => {
    if (!canSend) return;
    onSubmit({ text: text.trim(), mode: mode?.id, attachments });
    setText("");
    setMenuOpen(false);
  };

  return (
    <View className={className}>
      {menuOpen ? (
        <View className="mb-3">
          <ComposerMenu
            modeId={mode?.id ?? null}
            onSelectMode={(selected) => {
              setMode(selected);
              setMenuOpen(false);
            }}
            onClearMode={() => setMode(null)}
            onUploadPress={() => setMenuOpen(false)}
          />
        </View>
      ) : null}

      <ComposerContextChips mode={mode} attachments={attachments} onClearMode={() => setMode(null)} onRemoveAttachment={() => undefined} />

      <View
        className="h-[62px] flex-row items-center border border-white/90 bg-white/75 pl-2 pr-[7px]"
        style={[{ borderRadius: 31 }, shadows.card]}
      >
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add file or choose learning mode"
          accessibilityState={{ expanded: menuOpen }}
          onPress={() => setMenuOpen((current) => !current)}
          className="h-[39px] w-[39px] items-center justify-center rounded-full border border-[#e1e6ed] bg-[#f1f4f8]"
          style={menuOpen ? { backgroundColor: "#273345" } : null}
        >
          <View style={menuOpen ? { transform: [{ rotate: "45deg" }] } : null}>
            <Icon name="plus" size={19} color={menuOpen ? colors.white : "#667183"} />
          </View>
        </Pressable>

        <TextInput
          value={text}
          onChangeText={setText}
          onSubmitEditing={submit}
          placeholder={placeholder ?? placeholderForMode(mode)}
          placeholderTextColor="#9199a8"
          autoFocus={autoFocus}
          returnKeyType="send"
          multiline={false}
          accessibilityLabel="Ask Eduvoice anything"
          className="mx-3 flex-1 text-[13px] text-ink-strong"
          style={{ paddingVertical: 0 }}
        />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Send question"
          disabled={!canSend}
          onPress={submit}
          className="h-12 w-12 items-center justify-center rounded-full bg-navy"
          style={canSend ? null : { opacity: 0.45 }}
        >
          <Icon name="arrow" size={20} color={colors.white} strokeWidth={2} />
        </Pressable>
      </View>
    </View>
  );
}
