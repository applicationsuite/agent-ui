export { AIAssistant } from "./AIAssistant";
export type {
	AIAssistantProps,
	ChatMessage,
	AIAssistantAgent,
} from "./AIAssistant/AIAssistant.types";
export type {
	ChatAdapter,
	ChatEvent,
	SendMessageRequest,
} from "./adapters/types";
export { agUiAdapter } from "./adapters/agUiAdapter";
export { restAdapter } from "./adapters/restAdapter";
export { useChatState } from "./hooks/useChatState";
export type { AIAssistantExtension, ExtensionProps } from "./extensions/types";
export { ConversationHistory } from "./extensions/ConversationHistory";
export { StarterPrompts } from "./extensions/StarterPrompts";
export { TemplateRenderer } from "./extensions/TemplateRenderer";
export { useAIAssistantContext } from "./AIAssistant/AIAssistantContext";
export type { AIAssistantContextValue } from "./AIAssistant/AIAssistantContext";
export { createAssistantService } from "./services/createAssistantService";
export type { AIAssistantService } from "./services/types";
export { AIAssistantPermission } from "./AIAssistant/AIAssistant.types";
export { checkPermission } from "./AIAssistant/AIAssistant.utils";
