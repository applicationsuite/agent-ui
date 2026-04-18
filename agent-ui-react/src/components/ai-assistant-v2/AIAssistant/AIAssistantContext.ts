import { createContext, useContext } from "react";
import type { ChatMessage } from "./AIAssistant.types";
import type { AIAssistantPermission } from "./AIAssistant.types";
import type { AIAssistantAgent } from "./AIAssistant.types";
import type { AIAssistantService, StarterPrompt } from "../services/types";

export interface AIAssistantContextValue {
	sendMessage: (text: string) => void;
	newChat: () => void;
	messages: ChatMessage[];
	setMessages: (messages: ChatMessage[]) => void;
	service?: AIAssistantService;
	permissions?: AIAssistantPermission[];
	agents?: AIAssistantAgent[];
	starterPrompts: StarterPrompt[];
}

export const AIAssistantContext = createContext<
	AIAssistantContextValue | undefined
>(undefined);

export const useAIAssistantContext = (): AIAssistantContextValue => {
	const ctx = useContext(AIAssistantContext);
	if (!ctx)
		throw new Error("useAIAssistantContext must be used within <AIAssistant>");
	return ctx;
};
