/** Data models used by extensions — mirrors the v1 models. */

export interface StarterPrompt {
	id?: string;
	agentName?: string;
	title: string;
	description?: string;
	prompt?: string;
	parameters?: string[] | null;
	tags?: string[] | null;
	templates?: string[] | null;
}

export interface Template {
	id?: string;
	name: string;
	description?: string;
	content?: string;
	data?: string;
	agents: string[];
	createdAt?: string;
	updatedAt?: string;
	isStoredInDB?: boolean;
}

export interface Conversation {
	id: string;
	userOid: string;
	threadId: string;
	userEmail: string;
	firstMessageText: string;
	createdAt: string;
	lastActivityAt: string;
	agentName: string;
}

export interface ConversationMessage {
	id?: string;
	messageText: string;
	serializedMessage?: string;
	role: "user" | "assistant" | "system";
	timestamp: string;
	partitionKey: string;
}

export interface Entity<T> {
	data?: T;
	loading?: boolean;
	error?: string;
}

/** Service interface for starter prompt CRUD. */
export interface StarterPromptService {
	getStarterPrompts: (
		agentNames?: string[],
	) => Promise<Entity<StarterPrompt[]>>;
	addStarterPrompt: (prompt: StarterPrompt) => Promise<Entity<StarterPrompt>>;
	updateStarterPrompt: (
		prompt: StarterPrompt,
	) => Promise<Entity<StarterPrompt>>;
	deleteStarterPrompt: (
		promptId: string,
		agentName?: string,
	) => Promise<Entity<void>>;
}

/** Service interface for template CRUD. */
export interface TemplateService {
	getTemplates: () => Promise<Entity<Template[]>>;
	getTemplateById: (templateId: string) => Promise<Entity<Template>>;
	addTemplate: (template: Template) => Promise<Entity<Template>>;
	updateTemplate: (template: Template) => Promise<Entity<Template>>;
	deleteTemplate: (templateId: string) => Promise<Entity<void>>;
}

/** Service interface for conversation history. */
export interface ConversationService {
	getConversationHistory: () => Promise<Entity<Conversation[]>>;
	getConversationMessages: (
		threadId: string,
	) => Promise<Entity<ConversationMessage[]>>;
}

/** Combined service — consumers create one instance and pass it to AIAssistant. */
export interface AIAssistantService
	extends StarterPromptService,
		TemplateService,
		ConversationService {}
