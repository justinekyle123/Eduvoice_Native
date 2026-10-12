import { useContext } from "react";

import { ChatContext } from "../store/ChatProvider";

/** Reads the chat store. Must be rendered inside {@link ChatProvider}. */
export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used inside <ChatProvider>");
  }
  return context;
}
