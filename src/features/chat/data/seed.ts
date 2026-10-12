import type { Conversation } from "../types";

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;

/**
 * First-launch content so the chat list and thread screens have something real
 * to render before persistence and the assistant API land.
 */
export function createSeedConversations(now: number = Date.now()): Conversation[] {
  const first: Conversation = {
    id: "seed-photosynthesis",
    title: "Photosynthesis, simply",
    createdAt: now - 3 * HOUR,
    updatedAt: now - 3 * HOUR + 4 * MINUTE,
    messages: [
      {
        id: "seed-1-user",
        conversationId: "seed-photosynthesis",
        role: "user",
        text: "Explain photosynthesis in a way I can remember for my exam.",
        createdAt: now - 3 * HOUR,
        source: "voice",
      },
      {
        id: "seed-1-assistant",
        conversationId: "seed-photosynthesis",
        role: "assistant",
        text: "Think of a leaf as a tiny kitchen: sunlight is the stove, water and carbon dioxide are the ingredients, and glucose is the meal. Oxygen is what the kitchen vents out.",
        createdAt: now - 3 * HOUR + 2 * MINUTE,
        source: "text",
      },
      {
        id: "seed-1-assistant-2",
        conversationId: "seed-photosynthesis",
        role: "user",
        text: "Give me a two-line summary I can say out loud.",
        createdAt: now - 3 * HOUR + 4 * MINUTE,
        source: "text",
      },
    ],
  };

  const second: Conversation = {
    id: "seed-cell-structure",
    title: "Cell structure review",
    createdAt: now - 26 * HOUR,
    updatedAt: now - 26 * HOUR + 3 * MINUTE,
    messages: [
      {
        id: "seed-2-user",
        conversationId: "seed-cell-structure",
        role: "user",
        text: "Quiz me on cell structure, five questions, hint mode.",
        createdAt: now - 26 * HOUR,
        source: "text",
      },
      {
        id: "seed-2-assistant",
        conversationId: "seed-cell-structure",
        role: "assistant",
        text: "Question one of five: which organelle would you call the cell's post office, and why?",
        createdAt: now - 26 * HOUR + 3 * MINUTE,
        source: "text",
      },
    ],
  };

  return [first, second];
}
