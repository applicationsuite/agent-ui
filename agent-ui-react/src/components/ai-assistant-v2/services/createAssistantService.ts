import type { AIAssistantService, Entity } from "./types";

export interface CreateServiceOptions {
	baseUrl: string;
	getToken: () => Promise<string>;
}

export function createAssistantService(
	options: CreateServiceOptions,
): AIAssistantService {
	const { baseUrl, getToken } = options;

	const fetchApi = async <T>(
		path: string,
		method: "GET" | "POST" | "PUT" | "DELETE",
		body?: unknown,
	): Promise<Entity<T>> => {
		if (!baseUrl) return { error: "API base URL is required.", loading: false };
		try {
			const token = await getToken();
			if (!token) return { error: "Access token is required.", loading: false };
			const res = await fetch(`${baseUrl}${path}`, {
				method,
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: body ? JSON.stringify(body) : undefined,
			});
			if (!res.ok) {
				throw new Error(`HTTP ${res.status} ${res.statusText}`);
			}
			const data = method === "DELETE" ? undefined : await res.json();
			return { data: data as T, loading: false };
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Unknown error";
			return { error: msg, loading: false };
		}
	};

	return {
		// Starter Prompts
		getStarterPrompts: (agentNames) =>
			fetchApi("/starter-prompts/search", "POST", {
				agentNames: agentNames ?? [],
				tags: [],
			}),
		addStarterPrompt: (prompt) => fetchApi("/starter-prompts", "POST", prompt),
		updateStarterPrompt: (prompt) =>
			fetchApi(
				`/starter-prompts/${prompt.id}?agentName=${encodeURIComponent(prompt.agentName ?? "")}`,
				"PUT",
				prompt,
			),
		deleteStarterPrompt: (promptId, agentName) =>
			fetchApi(
				`/starter-prompts/${promptId}${agentName ? `?agentName=${encodeURIComponent(agentName)}` : ""}`,
				"DELETE",
			),

		// Templates
		getTemplates: () => fetchApi("/templates", "GET"),
		getTemplateById: (id) => fetchApi(`/templates/${id}`, "GET"),
		addTemplate: (template) => fetchApi("/templates", "POST", template),
		updateTemplate: (template) =>
			fetchApi(`/templates/${template.id}`, "PUT", template),
		deleteTemplate: (id) => fetchApi(`/templates/${id}`, "DELETE"),

		// Conversation History
		getConversationHistory: () => fetchApi("/conversations", "GET"),
		getConversationMessages: (threadId) =>
			fetchApi(`/conversations/${threadId}/messages`, "GET"),
	};
}
