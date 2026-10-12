import { appConfig } from "@/lib/config";

import { learningModeById } from "../constants";
import type { Attachment, LearningModeId } from "../types";

export type AssistantRequest = {
  prompt: string;
  mode?: LearningModeId;
  attachments?: Attachment[];
};

const STUB_LATENCY_MS = 900;

const modeIntros: Record<string, string> = {
  debate: "Let's pressure-test that. Here's the strongest counter-argument:",
  hint: "I'll nudge you instead of answering: what changes if you remove the first step?",
  interview: "Question two of five:",
};

/**
 * Asks the assistant for a reply.
 *
 * Still a local stub: it echoes the request so the thread, the typing state and
 * the learning-mode chips are all exercised end to end. Swap the body for
 * `api.post("/assistant", request)` once the backend exists — the signature
 * stays the same.
 */
export async function requestAssistantReply({ prompt, mode, attachments = [] }: AssistantRequest): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, STUB_LATENCY_MS));

  const intro = mode ? modeIntros[mode] : null;
  const attachmentNote = attachments.length
    ? ` I've noted the ${attachments.length} file${attachments.length > 1 ? "s" : ""} you attached.`
    : "";

  if (!appConfig.apiUrl) {
    const modeLabel = mode ? learningModeById[mode]?.name : null;
    return [
      intro ?? `Great question. Here's how I'd break down "${prompt.trim()}":`,
      modeLabel ? `\n\n(${modeLabel} mode will shape the real answer once the assistant API is connected.)` : "",
      attachmentNote,
      "\n\nStart from the core idea, then work through one worked example out loud — I'll listen and correct you as you go.",
    ]
      .filter(Boolean)
      .join("");
  }

  return `Reply pending for "${prompt.trim()}".${attachmentNote}`;
}
