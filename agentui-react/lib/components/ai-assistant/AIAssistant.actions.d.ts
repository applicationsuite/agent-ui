import { AIAssistantActionType, IEntity, IAIAssistantConversation, IAIAssistantMessage, IAIAssistantModel, IAIAssistantStarterPrompt, IAIAssistantTemplate, IAIAssistantProps, IResolvedTemplate, ITemplateInfo, IAIAssistantState } from './AIAssistant.models';
import { IAIAssistantService } from './AIAssistant.services';
export declare enum AI_ASSISTANT_DISPATCH_ACTIONS {
    SET_STARTER_PROMPTS = "SET_STARTER_PROMPTS",
    SET_TEMPLATES = "SET_TEMPLATES",
    SET_CONVERSATION_HISTORY = "SET_CONVERSATION_HISTORY",
    SET_MODELS = "SET_MODELS",
    SET_SELECTED_MODEL = "SET_SELECTED_MODEL",
    SET_ACTIVE_CONVERSATION_MESSAGES = "SET_ACTIVE_CONVERSATION_MESSAGES",
    SET_ACTIVE_CONVERSATION = "SET_ACTIVE_CONVERSATION",
    SET_AGUI_IN_PROGRESS = "SET_AGUI_IN_PROGRESS",
    SET_AGUI_RAW_DATA = "SET_AGUI_RAW_DATA"
}
export type IAIAssistantDispatchActions = {
    type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_STARTER_PROMPTS;
    data: IEntity<IAIAssistantStarterPrompt[]>;
} | {
    type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_TEMPLATES;
    data: IEntity<IAIAssistantTemplate[]>;
} | {
    type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_CONVERSATION_HISTORY;
    data: IEntity<IAIAssistantConversation[]>;
} | {
    type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_MODELS;
    data: IEntity<IAIAssistantModel[]>;
} | {
    type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_ACTIVE_CONVERSATION_MESSAGES;
    data: IEntity<IAIAssistantMessage[]>;
} | {
    type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_SELECTED_MODEL;
    data?: IAIAssistantModel;
} | {
    type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_ACTIVE_CONVERSATION;
    data?: IAIAssistantConversation;
} | {
    type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_AGUI_IN_PROGRESS;
    data: boolean;
} | {
    type: AI_ASSISTANT_DISPATCH_ACTIONS.SET_AGUI_RAW_DATA;
    data: string;
};
export interface IAIAssistantActions {
    initialize: () => Promise<void>;
    setActiveConversation: (conversation?: IAIAssistantConversation) => void;
    setSelectedModel: (modelId?: string) => void;
    handleAction: (action: AIAssistantActionType, payload?: unknown) => Promise<unknown>;
    resolveTemplate: (templateInfo: ITemplateInfo | undefined, userMessageText: string | undefined, payload: unknown, customPrompt: string | undefined, signal: AbortSignal) => Promise<IResolvedTemplate | undefined>;
}
export declare class AIAssistantActions implements IAIAssistantActions {
    private readonly dispatch;
    private readonly getState;
    private readonly service;
    private props;
    private abortController;
    private readonly resolveTemplateCache;
    constructor(dispatch: React.Dispatch<IAIAssistantDispatchActions>, getState: () => IAIAssistantState, service: IAIAssistantService, props: IAIAssistantProps);
    updateProps(props: IAIAssistantProps): void;
    resolveTemplate: (templateInfo: ITemplateInfo | undefined, _userMessageText: string | undefined, payload: unknown, customPrompt: string | undefined, _signal: AbortSignal) => Promise<IResolvedTemplate | undefined>;
    private abortActiveRun;
    initialize: () => Promise<void>;
    setActiveConversation: (conversation?: IAIAssistantConversation) => void;
    setSelectedModel: (modelId?: string) => void;
    handleAction: (action: AIAssistantActionType, payload?: unknown) => Promise<unknown>;
    private handleLoadConversation;
    private handleSendMessage;
}
