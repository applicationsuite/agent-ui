import { type ITemplatePageActions } from './TemplatePage.actions';
import type { ITemplatePageProps, ITemplatePageState } from './TemplatePage.models';
import { ITemplatePageService } from '../../AIAssistant.services';
export declare const useTemplatePage: (props: ITemplatePageProps, service: ITemplatePageService) => {
    state: ITemplatePageState;
    actions: ITemplatePageActions;
};
