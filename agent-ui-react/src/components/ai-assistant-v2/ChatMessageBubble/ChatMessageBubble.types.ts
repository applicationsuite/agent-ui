import type { ComponentType } from "react";
import type { ChatMessage } from "../AIAssistant/AIAssistant.types";

export interface ChatMessageBubbleProps {
	message: ChatMessage;
	renderMessage?: ComponentType<{ message: ChatMessage }>;
}
