import type { ComponentType } from "react";
import type { ChatMessage } from "../../AIAssistant.types";

export interface ChatMessageBubbleProps {
	message: ChatMessage;
	renderMessage?: ComponentType<{ message: ChatMessage }>;
}
