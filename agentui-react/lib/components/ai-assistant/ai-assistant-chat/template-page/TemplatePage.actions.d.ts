import { ITemplatePageService } from '../../AIAssistant.services';
import type { IAIAssistantTemplate, IEntity, ITemplatePageState } from './TemplatePage.models';
export declare enum TEMPLATE_PAGE_DISPATCH_ACTIONS {
    SET_TEMPLATES = "SET_TEMPLATES",
    SET_FORM_PANEL_TARGET = "SET_FORM_PANEL_TARGET",
    SET_DESIGN_PANEL_TARGET = "SET_DESIGN_PANEL_TARGET",
    SET_DELETE_TARGET = "SET_DELETE_TARGET",
    SET_DELETE_ERROR = "SET_DELETE_ERROR",
    SET_IS_DELETING = "SET_IS_DELETING",
    SET_IS_PANEL_LOADING = "SET_IS_PANEL_LOADING",
    SET_PANEL_ERROR = "SET_PANEL_ERROR",
    SET_SEARCH_QUERY = "SET_SEARCH_QUERY"
}
export type ITemplatePageDispatchActions = {
    type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_TEMPLATES;
    data: IEntity<IAIAssistantTemplate[]>;
} | {
    type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_FORM_PANEL_TARGET;
    data: IAIAssistantTemplate | null | undefined;
} | {
    type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_DESIGN_PANEL_TARGET;
    data: IAIAssistantTemplate | null;
} | {
    type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_DELETE_TARGET;
    data: IAIAssistantTemplate | null;
} | {
    type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_DELETE_ERROR;
    data: string;
} | {
    type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_IS_DELETING;
    data: boolean;
} | {
    type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_IS_PANEL_LOADING;
    data: boolean;
} | {
    type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_PANEL_ERROR;
    data: string;
} | {
    type: TEMPLATE_PAGE_DISPATCH_ACTIONS.SET_SEARCH_QUERY;
    data: string;
};
export interface ITemplatePageActions {
    initialize: () => Promise<void>;
    createTemplate: (template: IAIAssistantTemplate) => Promise<IAIAssistantTemplate | undefined>;
    updateTemplate: (template: IAIAssistantTemplate) => Promise<IAIAssistantTemplate | undefined>;
    deleteTemplate: (template: IAIAssistantTemplate) => Promise<void>;
    openFormPanel: (target: IAIAssistantTemplate | null) => Promise<void>;
    closeFormPanel: () => void;
    openDesignPanel: (template: IAIAssistantTemplate) => Promise<void>;
    closeDesignPanel: () => void;
    openDeleteDialog: (template: IAIAssistantTemplate) => void;
    closeDeleteDialog: () => void;
    confirmDelete: () => Promise<void>;
    setSearchQuery: (query: string) => void;
    saveTemplate: (template: IAIAssistantTemplate) => Promise<void>;
}
export declare class TemplatePageActions implements ITemplatePageActions {
    private readonly dispatch;
    private readonly getState;
    private readonly service;
    constructor(dispatch: React.Dispatch<ITemplatePageDispatchActions>, getState: () => ITemplatePageState, service: ITemplatePageService);
    private setTemplates;
    initialize: () => Promise<void>;
    fetchTemplateById: (templateId: string) => Promise<IAIAssistantTemplate | undefined>;
    createTemplate: (template: IAIAssistantTemplate) => Promise<IAIAssistantTemplate | undefined>;
    updateTemplate: (template: IAIAssistantTemplate) => Promise<IAIAssistantTemplate | undefined>;
    deleteTemplate: (templateInput: IAIAssistantTemplate) => Promise<void>;
    openFormPanel: (target: IAIAssistantTemplate | null) => Promise<void>;
    closeFormPanel: () => void;
    openDesignPanel: (template: IAIAssistantTemplate) => Promise<void>;
    closeDesignPanel: () => void;
    openDeleteDialog: (template: IAIAssistantTemplate) => void;
    closeDeleteDialog: () => void;
    confirmDelete: () => Promise<void>;
    setSearchQuery: (query: string) => void;
    saveTemplate: (template: IAIAssistantTemplate) => Promise<void>;
}
