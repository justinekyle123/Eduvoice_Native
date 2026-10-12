/** Lifecycle of a single voice interaction. */
export type VoiceStatus =
  | "idle"
  | "listening"
  | "captured"
  | "sending";

export type Transcript = {
  text: string;
  /** 0–1 confidence from the speech recogniser. */
  confidence: number;
};

/**
 * Contract for the speech layer.
 *
 * The UI only depends on this interface, so swapping the stub for on-device
 * speech recognition (or a streaming backend) later is a one-line change.
 */
export interface VoiceEngine {
  readonly id: string;
  startListening(): Promise<void>;
  stopListening(): Promise<void>;
  /** Resolves with the final transcript for the current utterance. */
  transcribe(): Promise<Transcript>;
}

export type VoiceSessionOptions = {
  /** Called with the final transcript when the user confirms a turn. */
  onConfirm?: (transcript: Transcript) => void;
};
