import { STUB_LISTEN_DURATION_MS } from "../constants";
import type { Transcript, VoiceEngine } from "../types";

const SCRIPTS = [
  "Explain photosynthesis in a way I can remember for my exam.",
  "Quiz me on the notes I uploaded yesterday.",
  "Plan a twenty minute study session for cell biology.",
] as const;

export type StubVoiceEngineOptions = {
  scripts?: readonly string[];
  /** Simulated listening latency in milliseconds. */
  delayMs?: number;
};

/**
 * Scripted stand-in for real speech recognition.
 *
 * It mirrors the behaviour the UI expects — start, stop, then a final
 * transcript — so the experience can be reviewed before microphone capture is
 * wired up. Replace `voiceEngine` with an `expo-audio` + speech-recognition
 * implementation when the native work lands; nothing else has to change.
 */
export function createStubVoiceEngine({ scripts = SCRIPTS, delayMs = STUB_LISTEN_DURATION_MS }: StubVoiceEngineOptions = {}): VoiceEngine {
  let utterance = 0;

  return {
    id: "stub",
    async startListening() {
      // No microphone is opened yet: the delay simulates a live utterance.
    },
    async stopListening() {
      // Nothing to tear down for the stub.
    },
    async transcribe(): Promise<Transcript> {
      const text = scripts[utterance % scripts.length] ?? "";
      utterance += 1;
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      return { text, confidence: 0.94 };
    },
  };
}

/** Shared engine instance used by {@link useVoiceSession}. */
export const voiceEngine = createStubVoiceEngine();
