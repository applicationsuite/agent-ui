import type { ComponentType } from "react";
import type { ChatMessage } from "../AIAssistant/AIAssistant.types";

export interface ChatAreaProps {
	messages: ChatMessage[];
	isStreaming: boolean;
	streamingText: string;
	renderMessage?: ComponentType<{ message: ChatMessage }>;
}
