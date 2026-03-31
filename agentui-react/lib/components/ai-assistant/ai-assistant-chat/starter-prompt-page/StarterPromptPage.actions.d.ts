import { IStarterPromptPageService } from '../../AIAssistant.services';
import type { IAIAssistantStarterPrompt, IEntity, IStarterPromptPageState } from './StarterPromptPage.models';
export declare enum STARTER_PROMPT_PAGE_DISPATCH_ACTIONS {
    SET_PROMPTS = "SET_PROMPTS",
    SET_PANEL_TARGET = "SET_PANEL_TARGET",
    SET_DELETE_TARGET = "SET_DELETE_TARGET",
    SET_DELETE_ERROR = "SET_DELETE_ERROR",
    SET_IS_DELETING = "SET_IS_DELETING",
    SET_IS_SAVING = "SET_IS_SAVING",
    SET_PANEL_ERROR = "SET_PANEL_ERROR",
    SET_SEARCH_QUERY = "SET_SEARCH_QUERY"
}
export type IStarterPromptPageDispatchActions = {
    type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_PROMPTS;
    data: IEntity<IAIAssistantStarterPrompt[]>;
} | {
    type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_PANEL_TARGET;
    data: IAIAssistantStarterPrompt | null | undefined;
} | {
    type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_DELETE_TARGET;
    data: IAIAssistantStarterPrompt | null;
} | {
    type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_DELETE_ERROR;
    data: string;
} | {
    type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_IS_DELETING;
    data: boolean;
} | {
    type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_IS_SAVING;
    data: boolean;
} | {
    type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_PANEL_ERROR;
    data: string;
} | {
    type: STARTER_PROMPT_PAGE_DISPATCH_ACTIONS.SET_SEARCH_QUERY;
    data: string;
};
export interface IStarterPromptPageActions {
    initialize: () => Promise<void>;
    openCreatePanel: () => void;
    openEditPanel: (prompt: IAIAssistantStarterPrompt) => void;
    closePanel: () => void;
    openDeleteDialog: (prompt: IAIAssistantStarterPrompt) => void;
    closeDeleteDialog: () => void;
    confirmDelete: () => Promise<void>;
    savePrompt: (prompt: IAIAssistantStarterPrompt) => Promise<void>;
    setSearchQuery: (query: string) => void;
}
export declare class StarterPromptPageActions implements IStarterPromptPageActions {
    private readonly dispatch;
    private readonly getState;
    private readonly service;
    constructor(dispatch: React.Dispatch<IStarterPromptPageDispatchActions>, getState: () => IStarterPromptPageState, service: IStarterPromptPageService);
    private setPrompts;
    initialize: () => Promise<void>;
    savePrompt: (prompt: IAIAssistantStarterPrompt) => Promise<void>;
    openCreatePanel: () => void;
    openEditPanel: (prompt: IAIAssistantStarterPrompt) => void;
    closePanel: () => void;
    openDeleteDialog: (prompt: IAIAssistantStarterPrompt) => void;
    closeDeleteDialog: () => void;
    confirmDelete: () => Promise<void>;
    setSearchQuery: (query: string) => void;
}
