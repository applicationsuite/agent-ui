import { buildSystemPrompt, normalizeGeneratedHtml } from './AIAssistant.utils';
import { getErrorMessage } from './AIAssistant.utils';
import { ExtendedHttpAgent } from './ag-ui/agui.client';
import { createAGUISubscriber, processToolResults, } from './ag-ui/agui.subscriber';
export class AIAssistantService {
    constructor(config, getToken, agents = []) {
        Object.defineProperty(this, "apiBaseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "getToken", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "agentNames", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "agentUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "agent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "runAgent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (request) => {
                if (!this.agentUrl) {
                    throw new Error('AG-UI agent is not configured. Provide config.agentConfig.url to enable chat.');
                }
                if (!this.agent) {
                    this.agent = new ExtendedHttpAgent({ url: this.agentUrl });
                }
                const accessToken = await this.getRequiredAccessToken().catch(() => '');
                this.agent.threadId = request.threadId;
                this.agent.headers = accessToken
                    ? { Authorization: `Bearer ${accessToken}` }
                    : {};
                this.agent.model = request.model;
                const acc = { text: '', toolCalls: new Map() };
                const onUpdate = () => {
                    request.onUpdate?.(acc.text || 'Waiting for response...');
                };
                const userMessage = {
                    id: request.messageId,
                    role: 'user',
                    content: request.message,
                };
                this.agent.setMessages([userMessage]);
                const subscriber = createAGUISubscriber(acc, onUpdate);
                const result = await this.agent.runAgent({ abortController: request.abortController ?? new AbortController() }, subscriber);
                const responseMessages = result.newMessages ?? [];
                processToolResults(responseMessages, acc);
                const assistantText = responseMessages
                    .filter((msg) => msg.role === 'assistant')
                    .map((msg) => msg.content ?? '')
                    .join('\n')
                    .trim();
                return {
                    text: assistantText || acc.text,
                    messages: responseMessages,
                    toolCalls: Array.from(acc.toolCalls.values()),
                    error: acc.error,
                };
            }
        });
        // ── Core fetch helper ────────────────────────────────────────────────────
        Object.defineProperty(this, "fetchApi", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (options) => {
                if (!this.apiBaseUrl) {
                    return this.createErrorEntity('AIAssistant apiBaseUrl is required.');
                }
                try {
                    const token = await this.getRequiredAccessToken();
                    const headers = {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        ...options.headers,
                    };
                    const response = await fetch(`${this.apiBaseUrl}${options.path}`, {
                        method: options.method,
                        headers,
                        body: options.body ? JSON.stringify(options.body) : undefined,
                    });
                    if (!response.ok) {
                        throw new Error(`${options.errorLabel}: ${response.status} ${response.statusText}`);
                    }
                    const data = options.method === 'DELETE' ? undefined : await response.json();
                    return this.createSuccessEntity(data);
                }
                catch (error) {
                    return this.createErrorEntity(getErrorMessage(error, `${options.errorLabel}.`));
                }
            }
        });
        // ── Starter prompts ──────────────────────────────────────────────────────
        Object.defineProperty(this, "getStarterPrompts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async () => this.fetchApi({
                path: '/starter-prompts/search',
                method: 'POST',
                body: { agentNames: this.agentNames, tags: [] },
                errorLabel: 'Failed to fetch starter prompts',
            })
        });
        Object.defineProperty(this, "addStarterPrompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (prompt) => {
                let normalizedPrompt;
                try {
                    normalizedPrompt = this.normalizeStarterPrompt(prompt);
                }
                catch (error) {
                    return this.createErrorEntity(getErrorMessage(error, 'Failed to create starter prompt.'));
                }
                return this.fetchApi({
                    path: '/starter-prompts',
                    method: 'POST',
                    body: normalizedPrompt,
                    errorLabel: 'Failed to create starter prompt',
                });
            }
        });
        Object.defineProperty(this, "updateStarterPrompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (prompt) => {
                let normalizedPrompt;
                try {
                    normalizedPrompt = this.normalizeStarterPrompt(prompt);
                }
                catch (error) {
                    return this.createErrorEntity(getErrorMessage(error, 'Failed to update starter prompt.'));
                }
                return this.fetchApi({
                    path: `/starter-prompts/${encodeURIComponent(normalizedPrompt.id ?? '')}?agentName=${encodeURIComponent(normalizedPrompt.agentName ?? '')}`,
                    method: 'PUT',
                    body: normalizedPrompt,
                    errorLabel: 'Failed to update starter prompt',
                });
            }
        });
        Object.defineProperty(this, "deleteStarterPrompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (promptId, agentName) => {
                const normalizedPromptId = promptId.trim();
                if (!normalizedPromptId) {
                    return this.createErrorEntity('Starter prompt id is required.');
                }
                const resolvedAgentName = agentName?.trim();
                if (!resolvedAgentName) {
                    return this.createErrorEntity('Starter prompt agent name is required.');
                }
                return this.fetchApi({
                    path: `/starter-prompts/${encodeURIComponent(normalizedPromptId)}?agentName=${encodeURIComponent(resolvedAgentName)}`,
                    method: 'DELETE',
                    errorLabel: 'Failed to delete starter prompt',
                });
            }
        });
        // ── Conversations ────────────────────────────────────────────────────────
        Object.defineProperty(this, "getConversationHistory", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async () => {
                const entity = await this.fetchApi({
                    path: '/conversations',
                    method: 'GET',
                    errorLabel: 'Failed to fetch conversations',
                });
                if (!entity.data)
                    return entity;
                return this.createSuccessEntity(entity.data
                    .map((conversation) => ({
                    id: `${conversation.threadId}_${conversation.agentName ?? this.getDefaultAgentName()}`,
                    userOid: conversation.userOid ?? 'local-user',
                    threadId: conversation.threadId ?? '',
                    userEmail: conversation.userEmail ?? '',
                    firstMessageText: conversation.firstMessageText?.trim() || 'Untitled conversation',
                    createdAt: conversation.createdAt ?? new Date().toISOString(),
                    lastActivityAt: conversation.lastActivityAt ??
                        conversation.createdAt ??
                        new Date().toISOString(),
                    agentName: conversation.agentName ?? this.getDefaultAgentName(),
                }))
                    .sort((left, right) => Date.parse(right.lastActivityAt) - Date.parse(left.lastActivityAt)));
            }
        });
        Object.defineProperty(this, "getConversationMessages", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (threadId) => {
                const normalizedThreadId = threadId.trim();
                if (!normalizedThreadId) {
                    return this.createErrorEntity('Conversation threadId is required.', []);
                }
                const entity = await this.fetchApi({
                    path: `/conversations/${encodeURIComponent(normalizedThreadId)}/messages`,
                    method: 'GET',
                    errorLabel: `Failed to fetch messages for thread ${normalizedThreadId}`,
                });
                if (!entity.data)
                    return entity;
                return this.createSuccessEntity(entity.data
                    .filter((message) => message.role !== 'system')
                    .map((message) => ({
                    id: message.id,
                    messageText: message.messageText,
                    serializedMessage: message.serializedMessage,
                    role: message.role,
                    timestamp: this.normalizeTimestamp(message.timestamp),
                    partitionKey: message.partitionKey,
                })));
            }
        });
        // ── Models ───────────────────────────────────────────────────────────────
        Object.defineProperty(this, "getAIModels", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async () => {
                const entity = await this.fetchApi({
                    path: '/models',
                    method: 'GET',
                    errorLabel: 'Failed to fetch models',
                });
                if (!entity.data)
                    return entity;
                const normalizedModels = entity.data
                    .map((item) => {
                    if (typeof item === 'string') {
                        const modelName = item.trim();
                        return modelName ? { label: modelName, value: modelName } : undefined;
                    }
                    if (item.isEnabled === false)
                        return undefined;
                    const resolvedValue = (item.value ??
                        item.deploymentName ??
                        item.name ??
                        item.label)?.trim();
                    if (!resolvedValue)
                        return undefined;
                    return {
                        label: item.label?.trim() || resolvedValue,
                        value: resolvedValue,
                    };
                })
                    .filter((model) => Boolean(model?.value));
                if (normalizedModels.length === 0) {
                    return this.createErrorEntity('No AI models returned from API.', []);
                }
                return this.createSuccessEntity(normalizedModels);
            }
        });
        // ── Dynamic UI ───────────────────────────────────────────────────────────
        Object.defineProperty(this, "generateDynamicUi", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (payload, customPrompt, model) => {
                const templatePrompt = [buildSystemPrompt(), customPrompt?.trim()]
                    .filter(Boolean)
                    .join('\n\n');
                try {
                    const token = await this.getRequiredAccessToken();
                    const response = await fetch(`${this.apiBaseUrl}/render/html`, {
                        method: 'POST',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            'X-Model-Deployment': model ?? '',
                        },
                        body: JSON.stringify({
                            data: JSON.stringify(payload),
                            templatePrompt,
                        }),
                    });
                    if (!response.ok) {
                        throw new Error(`Failed to fetch dynamic UI: ${response.status} ${response.statusText}`);
                    }
                    const content = response.body ? await response.text() : '';
                    return normalizeGeneratedHtml(content);
                }
                catch {
                    return payload && typeof payload === 'object'
                        ? JSON.stringify(payload, null, 2)
                        : String(payload);
                }
            }
        });
        // ── Templates ────────────────────────────────────────────────────────────
        Object.defineProperty(this, "getTemplates", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async () => this.fetchApi({
                path: '/templates',
                method: 'GET',
                errorLabel: 'Failed to fetch templates',
            })
        });
        Object.defineProperty(this, "getTemplateById", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (templateId) => {
                const normalizedId = templateId.trim();
                if (!normalizedId) {
                    return this.createErrorEntity('Template id is required.');
                }
                return this.fetchApi({
                    path: `/templates/${encodeURIComponent(normalizedId)}`,
                    method: 'GET',
                    errorLabel: 'Failed to fetch template',
                });
            }
        });
        Object.defineProperty(this, "addTemplate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (template) => this.fetchApi({
                path: '/templates',
                method: 'POST',
                body: {
                    name: template.name,
                    description: template.description,
                    content: template.content,
                    data: template.data,
                    agents: template.agents,
                },
                errorLabel: 'Failed to create template',
            })
        });
        Object.defineProperty(this, "updateTemplate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (template) => {
                if (!template.id) {
                    return this.createErrorEntity('Template id is required.');
                }
                return this.fetchApi({
                    path: `/templates/${encodeURIComponent(template.id)}`,
                    method: 'PUT',
                    body: {
                        name: template.name,
                        description: template.description,
                        content: template.content,
                        data: template.data,
                        agents: template.agents,
                    },
                    errorLabel: 'Failed to update template',
                });
            }
        });
        Object.defineProperty(this, "deleteTemplate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (templateId) => {
                const normalizedId = templateId.trim();
                if (!normalizedId) {
                    return this.createErrorEntity('Template id is required.');
                }
                return this.fetchApi({
                    path: `/templates/${encodeURIComponent(normalizedId)}`,
                    method: 'DELETE',
                    errorLabel: 'Failed to delete template',
                });
            }
        });
        // ── Private helpers ──────────────────────────────────────────────────────
        Object.defineProperty(this, "createSuccessEntity", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (data) => ({
                data,
                loading: false,
            })
        });
        Object.defineProperty(this, "createErrorEntity", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (error, data) => ({
                data,
                loading: false,
                error,
            })
        });
        Object.defineProperty(this, "normalizeStarterPrompt", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (prompt) => {
                const title = prompt.title.trim();
                const promptText = (prompt.prompt ?? prompt.description ?? title).trim();
                const agentName = (prompt.agentName ?? this.getDefaultAgentName()).trim();
                if (!title) {
                    throw new Error('Starter prompt title is required.');
                }
                if (!agentName) {
                    throw new Error('Starter prompt agent name is required.');
                }
                return {
                    ...prompt,
                    id: prompt.id?.trim() || this.createStarterPromptId(),
                    title,
                    prompt: promptText,
                    description: prompt.description?.trim() || promptText,
                    agentName,
                    parameters: prompt.parameters ?? null,
                    tags: prompt.tags ?? null,
                    templates: prompt.templates ?? null,
                };
            }
        });
        Object.defineProperty(this, "createStarterPromptId", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                if (typeof globalThis.crypto?.randomUUID === 'function') {
                    return globalThis.crypto.randomUUID();
                }
                return `starter-prompt-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
            }
        });
        Object.defineProperty(this, "getDefaultAgentName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => this.agentNames[0] ?? 'Orchestrator'
        });
        Object.defineProperty(this, "normalizeTimestamp", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (value) => {
                const trimmed = value.trim();
                if (/[+-]\d{2}:$/.test(trimmed))
                    return `${trimmed}00`;
                if (/[+-]\d{2}$/.test(trimmed))
                    return `${trimmed}:00`;
                return trimmed;
            }
        });
        Object.defineProperty(this, "getRequiredAccessToken", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async () => {
                const token = (await this.getToken()).trim();
                if (!token) {
                    throw new Error('AIAssistant access token is required.');
                }
                return token;
            }
        });
        this.apiBaseUrl = config.api.baseUrl.trim();
        this.getToken = getToken;
        this.agentUrl = config.agentConfig?.url ?? '';
        this.agentNames = agents
            .map((agent) => agent.name.trim())
            .filter((agentName) => agentName.length > 0);
    }
}
