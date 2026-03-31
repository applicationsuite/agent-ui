import { AIAssistantActionType, AIAssistantFeature, hasFeature, } from './AIAssistant.models';
import { TemplateRenderer } from '../templates/template-renderer/TemplateRenderer';
import { buildCacheKey, buildPayloadFromToolCalls, buildRawToolPayload, createAssistantMessage, createConversation, createThreadId, extractCustomPrompt, extractRenderablePayload, getErrorMessage, hasRegisteredTemplate, isConversation, shouldRenderHelloWorldTemplate, } from './AIAssistant.utils';
export var AI_ASSISTANT_DISPATCH_ACTIONS;
(function (AI_ASSISTANT_DISPATCH_ACTIONS) {
    AI_ASSISTANT_DISPATCH_ACTIONS["SET_STARTER_PROMPTS"] = "SET_STARTER_PROMPTS";
    AI_ASSISTANT_DISPATCH_ACTIONS["SET_TEMPLATES"] = "SET_TEMPLATES";
    AI_ASSISTANT_DISPATCH_ACTIONS["SET_CONVERSATION_HISTORY"] = "SET_CONVERSATION_HISTORY";
    AI_ASSISTANT_DISPATCH_ACTIONS["SET_MODELS"] = "SET_MODELS";
    AI_ASSISTANT_DISPATCH_ACTIONS["SET_SELECTED_MODEL"] = "SET_SELECTED_MODEL";
    AI_ASSISTANT_DISPATCH_ACTIONS["SET_ACTIVE_CONVERSATION_MESSAGES"] = "SET_ACTIVE_CONVERSATION_MESSAGES";
    AI_ASSISTANT_DISPATCH_ACTIONS["SET_ACTIVE_CONVERSATION"] = "SET_ACTIVE_CONVERSATION";
    AI_ASSISTANT_DISPATCH_ACTIONS["SET_AGUI_IN_PROGRESS"] = "SET_AGUI_IN_PROGRESS";
    AI_ASSISTANT_DISPATCH_ACTIONS["SET_AGUI_RAW_DATA"] = "SET_AGUI_RAW_DATA";
})(AI_ASSISTANT_DISPATCH_ACTIONS || (AI_ASSISTANT_DISPATCH_ACTIONS = {}));
export class AIAssistantActions {
    constructor(dispatch, getState, service, props) {
        Object.defineProperty(this, "dispatch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "getState", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "service", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "props", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "abortController", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "resolveTemplateCache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "resolveTemplate", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (templateInfo, _userMessageText, payload, customPrompt, _signal) => {
                const cacheKey = buildCacheKey(templateInfo, payload, customPrompt);
                if (this.resolveTemplateCache.has(cacheKey)) {
                    return this.resolveTemplateCache.get(cacheKey);
                }
                if (templateInfo && this.props.getTemplate) {
                    const component = this.props.getTemplate(templateInfo);
                    if (component) {
                        const result = {
                            type: 'component',
                            component,
                            data: templateInfo.data,
                            onAction: (_action, args) => {
                                if (args.prompt) {
                                    this.handleAction(AIAssistantActionType.SendMessage, args.prompt);
                                }
                            },
                        };
                        this.resolveTemplateCache.set(cacheKey, result);
                        return result;
                    }
                }
                // Try fetching the template config from the server
                if (templateInfo?.templateId && templateInfo?.isStoredInDb) {
                    const entity = await this.service.getTemplateById(templateInfo.templateId);
                    const serverConfig = entity.data?.content
                        ? JSON.parse(entity.data.content)
                        : undefined;
                    if (serverConfig) {
                        const result = {
                            type: 'component',
                            component: TemplateRenderer,
                            data: {
                                template: serverConfig,
                                serverData: templateInfo.data,
                            },
                            onAction: (_action, args) => {
                                if (args.prompt) {
                                    this.handleAction(AIAssistantActionType.SendMessage, args.prompt);
                                }
                            },
                        };
                        this.resolveTemplateCache.set(cacheKey, result);
                        return result;
                    }
                }
                const isDynamicUiAllowed = hasFeature(this.props.features, AIAssistantFeature.DynamicUi);
                const html = isDynamicUiAllowed
                    ? await this.service.generateDynamicUi(payload, customPrompt, this.getState().selectedModel?.value)
                    : undefined;
                const result = html ? { type: 'html', html } : undefined;
                this.resolveTemplateCache.set(cacheKey, result);
                return result;
            }
        });
        Object.defineProperty(this, "abortActiveRun", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: () => {
                this.abortController?.abort();
                this.abortController = null;
                // Add a cancelled message to the conversation
                const state = this.getState();
                const currentMessages = state.activeConversationMessages.data ?? [];
                const threadId = state.activeConversation?.threadId ?? '';
                const cancelledMessage = createAssistantMessage('The request has been cancelled.', threadId);
                this.dispatch({
                    type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_ACTIVE_CONVERSATION_MESSAGES,
                    data: {
                        data: [...currentMessages, cancelledMessage],
                        loading: false,
                    },
                });
                this.dispatch({
                    type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_AGUI_IN_PROGRESS,
                    data: false,
                });
            }
        });
        Object.defineProperty(this, "initialize", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async () => {
                const state = this.getState();
                this.dispatch({
                    type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_STARTER_PROMPTS,
                    data: { data: state.starterPrompts.data, loading: true },
                });
                this.dispatch({
                    type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_TEMPLATES,
                    data: { data: state.templates.data, loading: true },
                });
                this.dispatch({
                    type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_CONVERSATION_HISTORY,
                    data: { data: state.conversationHistory.data, loading: true },
                });
                this.dispatch({
                    type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_MODELS,
                    data: { data: state.models.data, loading: true },
                });
                this.dispatch({
                    type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_ACTIVE_CONVERSATION_MESSAGES,
                    data: {
                        data: state.activeConversationMessages.data ?? [],
                        loading: false,
                    },
                });
                try {
                    const [starterPromptsEntity, templatesEntity, conversationHistoryEntity, modelsEntity,] = await Promise.all([
                        this.service.getStarterPrompts(),
                        this.service.getTemplates(),
                        this.service.getConversationHistory(),
                        this.service.getAIModels(),
                    ]);
                    const starterPrompts = {
                        data: starterPromptsEntity.data ?? state.starterPrompts.data ?? [],
                        loading: starterPromptsEntity.loading ?? false,
                        error: starterPromptsEntity.error,
                    };
                    const templates = {
                        data: templatesEntity.data ?? state.templates.data ?? [],
                        loading: templatesEntity.loading ?? false,
                        error: templatesEntity.error,
                    };
                    const conversationHistory = {
                        data: conversationHistoryEntity.data ??
                            state.conversationHistory.data ??
                            [],
                        loading: conversationHistoryEntity.loading ?? false,
                        error: conversationHistoryEntity.error,
                    };
                    const models = {
                        data: modelsEntity.data ?? state.models.data ?? [],
                        loading: modelsEntity.loading ?? false,
                        error: modelsEntity.error,
                    };
                    const selectedModel = models.data?.find((model) => model.value === this.getState().selectedModel?.value) ??
                        models.data?.[0] ??
                        this.getState().selectedModel;
                    this.dispatch({
                        type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_STARTER_PROMPTS,
                        data: starterPrompts,
                    });
                    this.dispatch({
                        type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_TEMPLATES,
                        data: templates,
                    });
                    this.dispatch({
                        type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_CONVERSATION_HISTORY,
                        data: conversationHistory,
                    });
                    this.dispatch({
                        type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_MODELS,
                        data: models,
                    });
                    this.dispatch({
                        type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_SELECTED_MODEL,
                        data: selectedModel,
                    });
                }
                catch (error) {
                    console.error('[AIAssistant] Failed to initialize assistant data.', error);
                    this.dispatch({
                        type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_STARTER_PROMPTS,
                        data: {
                            data: state.starterPrompts.data ?? [],
                            loading: false,
                            error: 'Unable to load starter prompts.',
                        },
                    });
                    this.dispatch({
                        type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_TEMPLATES,
                        data: {
                            data: state.templates.data ?? [],
                            loading: false,
                            error: 'Unable to load templates.',
                        },
                    });
                    this.dispatch({
                        type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_CONVERSATION_HISTORY,
                        data: {
                            data: state.conversationHistory.data ?? [],
                            loading: false,
                            error: 'Unable to load conversation history.',
                        },
                    });
                    this.dispatch({
                        type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_MODELS,
                        data: {
                            data: state.models.data ?? [],
                            loading: false,
                            error: 'Unable to load AI models.',
                        },
                    });
                }
            }
        });
        Object.defineProperty(this, "setActiveConversation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (conversation) => {
                this.dispatch({
                    type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_ACTIVE_CONVERSATION,
                    data: conversation,
                });
            }
        });
        Object.defineProperty(this, "setSelectedModel", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (modelId) => {
                const models = this.getState().models.data ?? [];
                const selectedModel = models.find((model) => model.value === modelId) ??
                    (modelId ? { label: modelId, value: modelId } : models[0]);
                this.dispatch({
                    type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_SELECTED_MODEL,
                    data: selectedModel,
                });
            }
        });
        Object.defineProperty(this, "handleAction", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (action, payload) => {
                switch (action) {
                    case AIAssistantActionType.SetModel:
                        this.setSelectedModel(typeof payload === 'string' ? payload : undefined);
                        return undefined;
                    case AIAssistantActionType.SendMessage:
                        return this.handleSendMessage(typeof payload === 'string' ? payload : '');
                    case AIAssistantActionType.CancelMessage:
                        this.abortActiveRun();
                        return undefined;
                    case AIAssistantActionType.LoadConversation:
                        return this.handleLoadConversation(isConversation(payload) ? payload : undefined);
                    default:
                        return undefined;
                }
            }
        });
        Object.defineProperty(this, "handleLoadConversation", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (conversation) => {
                this.setActiveConversation(conversation);
                if (!conversation) {
                    this.dispatch({
                        type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_ACTIVE_CONVERSATION_MESSAGES,
                        data: { data: [], loading: false },
                    });
                    return;
                }
                // Clear old messages immediately so the UI shows a loading state
                this.dispatch({
                    type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_ACTIVE_CONVERSATION_MESSAGES,
                    data: { data: [], loading: true },
                });
                const messagesEntity = await this.service.getConversationMessages(conversation.threadId);
                this.dispatch({
                    type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_ACTIVE_CONVERSATION_MESSAGES,
                    data: {
                        data: messagesEntity.data ?? [],
                        loading: messagesEntity.loading ?? false,
                        error: messagesEntity.error,
                    },
                });
            }
        });
        Object.defineProperty(this, "handleSendMessage", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (messageText) => {
                const normalizedMessage = messageText.trim();
                if (!normalizedMessage) {
                    return;
                }
                const state = this.getState();
                const activeConversation = state.activeConversation;
                const now = new Date().toISOString();
                const threadId = activeConversation?.threadId ?? createThreadId();
                const agentName = activeConversation?.agentName ||
                    state.starterPrompts.data?.[0]?.agentName ||
                    'Orchestrator';
                const userMessage = {
                    id: `msg_${Date.now()}`,
                    messageText: normalizedMessage,
                    role: 'user',
                    timestamp: now,
                    partitionKey: threadId,
                };
                const nextConversation = activeConversation
                    ? {
                        ...activeConversation,
                        lastActivityAt: now,
                        agentName,
                    }
                    : createConversation(normalizedMessage, agentName, now, threadId);
                const conversationHistory = state.conversationHistory.data ?? [];
                const currentMessages = state.activeConversationMessages.data ?? [];
                this.dispatch({
                    type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_CONVERSATION_HISTORY,
                    data: {
                        data: [
                            nextConversation,
                            ...conversationHistory.filter((item) => item.id !== nextConversation.id),
                        ],
                        loading: false,
                    },
                });
                this.setActiveConversation(nextConversation);
                this.dispatch({
                    type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_ACTIVE_CONVERSATION_MESSAGES,
                    data: {
                        data: [...currentMessages, userMessage],
                        loading: true,
                    },
                });
                //Mock Template testing
                if (shouldRenderHelloWorldTemplate(normalizedMessage)) {
                    this.abortController?.abort();
                    this.abortController = null;
                    this.dispatch({
                        type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_AGUI_IN_PROGRESS,
                        data: false,
                    });
                    this.dispatch({
                        type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_AGUI_RAW_DATA,
                        data: '',
                    });
                    this.dispatch({
                        type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_ACTIVE_CONVERSATION_MESSAGES,
                        data: {
                            data: [...currentMessages, userMessage],
                            loading: false,
                        },
                    });
                    return;
                }
                //End of Mock template testing
                // Cancel any ongoing request and prepare a new abort controller
                this.abortController?.abort();
                this.abortController = new AbortController();
                // Set AGUI streaming state
                this.dispatch({
                    type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_AGUI_IN_PROGRESS,
                    data: true,
                });
                this.dispatch({
                    type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_AGUI_RAW_DATA,
                    data: '',
                });
                try {
                    if (!this.service.runAgent) {
                        throw new Error('AG-UI agent is not configured. Provide a service with runAgent or use config.agentConfig.url.');
                    }
                    const agentResult = await this.service.runAgent({
                        threadId,
                        message: normalizedMessage,
                        messageId: userMessage.id ?? `msg_${Date.now()}`,
                        model: this.getState().selectedModel?.value,
                        abortController: this.abortController,
                        onUpdate: (text) => {
                            this.dispatch({
                                type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_AGUI_RAW_DATA,
                                data: text,
                            });
                        },
                    });
                    const responseMessages = agentResult.messages;
                    const allToolCalls = agentResult.toolCalls;
                    const hasToolResults = allToolCalls.some((tc) => tc.result);
                    const toolCallResults = allToolCalls.filter((tc) => tc.result);
                    const renderPayload = buildPayloadFromToolCalls(toolCallResults) ??
                        extractRenderablePayload(responseMessages);
                    const assistantText = agentResult.text;
                    // Final raw data update
                    this.dispatch({
                        type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_AGUI_RAW_DATA,
                        data: assistantText || 'No response received.',
                    });
                    const assistantMessages = assistantText || renderPayload !== undefined
                        ? [
                            createAssistantMessage(assistantText || '', threadId, renderPayload),
                        ]
                        : [];
                    // Generate dynamic UI when tool calls returned data but no registered
                    // template matches.  Use the structured payload if available, otherwise
                    // fall back to raw tool result strings so the AI can still render them.
                    const needsAI = hasFeature(this.props.features, AIAssistantFeature.DynamicUi) &&
                        hasToolResults &&
                        assistantMessages.length > 0 &&
                        !hasRegisteredTemplate(renderPayload);
                    if (needsAI) {
                        const aiPayload = renderPayload ?? buildRawToolPayload(allToolCalls, assistantText);
                        try {
                            const generatedHtml = await this.service.generateDynamicUi(aiPayload, extractCustomPrompt(renderPayload), this.getState().selectedModel?.value);
                            if (generatedHtml) {
                                assistantMessages[0].serializedMessage = JSON.stringify({
                                    __generatedHtml: generatedHtml,
                                    __payload: aiPayload,
                                });
                            }
                        }
                        catch (err) {
                            console.error('[AIAssistant] Dynamic UI generation failed:', err);
                        }
                    }
                    this.dispatch({
                        type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_ACTIVE_CONVERSATION_MESSAGES,
                        data: {
                            data: [...currentMessages, userMessage, ...assistantMessages],
                            loading: false,
                        },
                    });
                }
                catch (error) {
                    // If the request was aborted, treat it as a user-initiated cancel
                    if (this.abortController?.signal.aborted) {
                        return;
                    }
                    this.dispatch({
                        type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_ACTIVE_CONVERSATION_MESSAGES,
                        data: {
                            data: [...currentMessages, userMessage],
                            loading: false,
                            error: getErrorMessage(error, 'Unable to send message.'),
                        },
                    });
                }
                finally {
                    this.abortController = null;
                    this.dispatch({
                        type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_AGUI_IN_PROGRESS,
                        data: false,
                    });
                }
            }
        });
        this.dispatch = dispatch;
        this.getState = getState;
        this.service = service;
        this.props = props;
    }
    updateProps(props) {
        this.props = props;
    }
}
