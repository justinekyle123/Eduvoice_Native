/** Prompts shown under the waveform so a new user knows what to say. */
export const SUGGESTED_PROMPTS = [
  "Explain photosynthesis simply",
  "Quiz me on my notes",
  "Plan a 20-minute study session",
] as const;

/** Bar heights for the listening waveform, taken from the design mock. */
export const WAVEFORM_BARS = [15, 28, 42, 24, 54, 35, 68, 48, 75, 39, 62, 31, 52, 26, 16] as const;

/** Fake latency before the stub engine returns a transcript. */
export const STUB_LISTEN_DURATION_MS = 1_900;

export const VOICE_COPY = {
  listening: {
    eyebrow: "Listening now",
    title: "Go ahead, I'm listening.",
    body: "Ask a question, review a topic, or plan your next study session.",
  },
  captured: {
    eyebrow: "Ready when you are",
    title: "Here's what I heard.",
    body: "Send it to Eduvoice, or tap the mic to say something else.",
  },
} as const;
