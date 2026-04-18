import type { ComponentType } from "react";
import type { ChatAdapter } from "./adapters/types";
import type { AIAssistantExtension } from "./extensions/types";

/* ── Data models ── */

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

/* ── Service interfaces ── */

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

export interface TemplateService {
	getTemplates: () => Promise<Entity<Template[]>>;
	getTemplateById: (templateId: string) => Promise<Entity<Template>>;
	addTemplate: (template: Template) => Promise<Entity<Template>>;
	updateTemplate: (template: Template) => Promise<Entity<Template>>;
	deleteTemplate: (templateId: string) => Promise<Entity<void>>;
}

export interface ConversationService {
	getConversationHistory: () => Promise<Entity<Conversation[]>>;
	getConversationMessages: (
		threadId: string,
	) => Promise<Entity<ConversationMessage[]>>;
}

export interface AIAssistantService
	extends StarterPromptService,
		TemplateService,
		ConversationService {}

/* ── Permission & chat types ── */

export enum AIAssistantPermission {
	View = "view",
	ManageTemplates = "manage_templates",
	ManageStarterPrompts = "manage_starter_prompts",
}

export interface ChatMessage {
	id: string;
	role: "user" | "assistant" | "error";
	content: string;
	timestamp: string;
	data?: Record<string, unknown>;
}

export interface AIAssistantAgent {
	name: string;
	description?: string;
}

export interface AIAssistantProps {
	adapter: ChatAdapter;
	theme?: "light" | "dark";
	greetingText?: string;
	headerText?: string;
	defaultFullScreen?: boolean;
	showFullScreenToggle?: boolean;
	className?: string;
	extensions?: AIAssistantExtension[];
	renderMessage?: ComponentType<{ message: ChatMessage }>;
	service?: AIAssistantService;
	permissions?: AIAssistantPermission[];
	agents?: AIAssistantAgent[];
	onClose?: () => void;
}
