import { IEntity, IAIAssistantAgent, IAIAssistantConversation, IAIAssistantMessage, IAIAssistantModel, IAIAssistantStarterPrompt, IAIAssistantTemplate, IAssistantConfig } from './AIAssistant.models';
import { type IToolCallRecord } from './ag-ui/agui.subscriber';
import type { Message } from '@ag-ui/core';
export interface IRunAgentRequest {
    threadId: string;
    message: string;
    messageId: string;
    model?: string;
    abortController?: AbortController;
    onUpdate?: (text: string) => void;
}
export interface IRunAgentResult {
    text: string;
    messages: Message[];
    toolCalls: IToolCallRecord[];
    error?: string;
}
/** Service interface for starter prompt CRUD — keeps StarterPromptPage decoupled from AIAssistant service. */
export interface IStarterPromptPageService {
    getStarterPrompts: () => Promise<IEntity<IAIAssistantStarterPrompt[]>>;
    addStarterPrompt: (prompt: IAIAssistantStarterPrompt) => Promise<IEntity<IAIAssistantStarterPrompt>>;
    updateStarterPrompt: (prompt: IAIAssistantStarterPrompt) => Promise<IEntity<IAIAssistantStarterPrompt>>;
    deleteStarterPrompt: (promptId: string, agentName?: string) => Promise<IEntity<void>>;
}
/** Service interface for template CRUD — keeps TemplatePage decoupled from AIAssistant service. */
export interface ITemplatePageService {
    getTemplates: () => Promise<IEntity<IAIAssistantTemplate[]>>;
    getTemplateById: (templateId: string) => Promise<IEntity<IAIAssistantTemplate>>;
    addTemplate: (template: IAIAssistantTemplate) => Promise<IEntity<IAIAssistantTemplate>>;
    updateTemplate: (template: IAIAssistantTemplate) => Promise<IEntity<IAIAssistantTemplate>>;
    deleteTemplate: (templateId: string) => Promise<IEntity<void>>;
}
export interface IAIAssistantService extends IStarterPromptPageService, ITemplatePageService {
    runAgent?: (request: IRunAgentRequest) => Promise<IRunAgentResult>;
    getConversationHistory: () => Promise<IEntity<IAIAssistantConversation[]>>;
    getConversationMessages: (threadId: string) => Promise<IEntity<IAIAssistantMessage[]>>;
    getAIModels: () => Promise<IEntity<IAIAssistantModel[]>>;
    generateDynamicUi: (payload: unknown, customPrompt: string | undefined, model: string | undefined) => Promise<string | undefined>;
}
export declare class AIAssistantService implements IAIAssistantService {
    private readonly apiBaseUrl;
    private readonly getToken;
    private readonly agentNames;
    private readonly agentUrl;
    private agent;
    constructor(config: IAssistantConfig, getToken: () => Promise<string>, agents?: IAIAssistantAgent[]);
    runAgent: (request: IRunAgentRequest) => Promise<IRunAgentResult>;
    private fetchApi;
    getStarterPrompts: () => Promise<IEntity<IAIAssistantStarterPrompt[]>>;
    addStarterPrompt: (prompt: IAIAssistantStarterPrompt) => Promise<IEntity<IAIAssistantStarterPrompt>>;
    updateStarterPrompt: (prompt: IAIAssistantStarterPrompt) => Promise<IEntity<IAIAssistantStarterPrompt>>;
    deleteStarterPrompt: (promptId: string, agentName?: string) => Promise<IEntity<void>>;
    getConversationHistory: () => Promise<IEntity<IAIAssistantConversation[]>>;
    getConversationMessages: (threadId: string) => Promise<IEntity<IAIAssistantMessage[]>>;
    getAIModels: () => Promise<IEntity<IAIAssistantModel[]>>;
    generateDynamicUi: (payload: unknown, customPrompt: string | undefined, model: string | undefined) => Promise<string | undefined>;
    getTemplates: () => Promise<IEntity<IAIAssistantTemplate[]>>;
    getTemplateById: (templateId: string) => Promise<IEntity<IAIAssistantTemplate>>;
    addTemplate: (template: IAIAssistantTemplate) => Promise<IEntity<IAIAssistantTemplate>>;
    updateTemplate: (template: IAIAssistantTemplate) => Promise<IEntity<IAIAssistantTemplate>>;
    deleteTemplate: (templateId: string) => Promise<IEntity<void>>;
    private createSuccessEntity;
    private createErrorEntity;
    private normalizeStarterPrompt;
    private createStarterPromptId;
    private getDefaultAgentName;
    private normalizeTimestamp;
    private getRequiredAccessToken;
}
