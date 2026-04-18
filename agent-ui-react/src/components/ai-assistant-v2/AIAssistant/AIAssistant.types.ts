import type { ComponentType } from "react";
import type { ChatAdapter } from "../adapters/types";
import type { AIAssistantExtension } from "../extensions/types";
import type { AIAssistantService } from "../services/types";

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
