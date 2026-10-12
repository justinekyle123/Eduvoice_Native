import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { voiceEngine } from "../services/voice-engine";
import type { Transcript, VoiceEngine, VoiceStatus } from "../types";

export type UseVoiceSessionOptions = {
  /** Defaults to the shared stub engine. */
  engine?: VoiceEngine;
  /** Opens the session straight into listening mode. */
  autoStart?: boolean;
};

export type VoiceSession = {
  status: VoiceStatus;
  isListening: boolean;
  isBusy: boolean;
  transcript: Transcript | null;
  /** Begins (or restarts) listening and simulates a finished utterance. */
  startListening: () => void;
  /** Pauses listening without discarding the current transcript. */
  pause: () => void;
  toggleListening: () => void;
  /** Uses a canned prompt (the "Try saying" chips). */
  useSuggestion: (text: string) => void;
  /** Clears the session back to its initial state. */
  reset: () => void;
};

/**
 * Owns the listening lifecycle for the voice screen: idle → listening →
 * captured, with the transcript kept so it can be handed to chat.
 */
export function useVoiceSession({ engine = voiceEngine, autoStart = true }: UseVoiceSessionOptions = {}): VoiceSession {
  const [status, setStatus] = useState<VoiceStatus>(autoStart ? "listening" : "idle");
  const [transcript, setTranscript] = useState<Transcript | null>(null);
  const runId = useRef(0);

  const listen = useCallback(() => {
    const current = ++runId.current;
    setStatus("listening");

    void engine.startListening();
    void engine.transcribe().then((result) => {
      // Ignore results from a session the user already cancelled or replaced.
      if (current !== runId.current) return;
      setTranscript(result);
      setStatus("captured");
    });
  }, [engine]);

  useEffect(() => {
    if (autoStart) listen();
    return () => {
      runId.current += 1;
      void engine.stopListening();
    };
  }, [autoStart, engine, listen]);

  const pause = useCallback(() => {
    runId.current += 1;
    void engine.stopListening();
    setStatus(transcript ? "captured" : "idle");
  }, [engine, transcript]);

  const toggleListening = useCallback(() => {
    if (status === "listening") {
      pause();
      return;
    }
    listen();
  }, [listen, pause, status]);

  const useSuggestion = useCallback(
    (text: string) => {
      runId.current += 1;
      void engine.stopListening();
      setTranscript({ text, confidence: 1 });
      setStatus("captured");
    },
    [engine],
  );

  const reset = useCallback(() => {
    runId.current += 1;
    void engine.stopListening();
    setTranscript(null);
    setStatus("idle");
  }, [engine]);

  return useMemo(
    () => ({
      status,
      isListening: status === "listening",
      isBusy: status === "listening" || status === "sending",
      transcript,
      startListening: listen,
      pause,
      toggleListening,
      useSuggestion,
      reset,
    }),
    [listen, pause, reset, status, transcript, toggleListening, useSuggestion],
  );
}
