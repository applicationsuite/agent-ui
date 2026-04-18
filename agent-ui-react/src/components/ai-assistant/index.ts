export { AIAssistant } from "./AIAssistant";
export type {
	AIAssistantProps,
	ChatMessage,
	AIAssistantAgent,
} from "./AIAssistant.types";
export type {
	ChatAdapter,
	ChatEvent,
	SendMessageRequest,
} from "./adapters/types";
export { agUiAdapter } from "./adapters/agUiAdapter";
export { restAdapter } from "./adapters/restAdapter";
export { useChatState } from "./useChatState";
export type { AIAssistantExtension, ExtensionProps } from "./extensions/types";
export { ConversationHistory } from "./extensions/conversation-history";
export { StarterPrompts } from "./extensions/starter-prompts";
export { TemplateRenderer } from "./extensions/template-renderer";
export { useAIAssistantContext } from "./AIAssistantContext";
export type { AIAssistantContextValue } from "./AIAssistantContext";
export { createAssistantService } from "./AIAssistant.services";
export type { AIAssistantService } from "./AIAssistant.types";
export { AIAssistantPermission } from "./AIAssistant.types";
export { checkPermission } from "./AIAssistant.utils";
