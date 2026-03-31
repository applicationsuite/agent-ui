import type { ITemplateInfo } from '../ai-assistant/AIAssistant.models';
export declare const useAssistantTemplates: () => {
    getTemplate: (template: ITemplateInfo) => import("..").TemplateComponent | undefined;
};
