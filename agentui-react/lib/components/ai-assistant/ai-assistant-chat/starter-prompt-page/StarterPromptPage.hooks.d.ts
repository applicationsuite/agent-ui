import { type IStarterPromptPageActions } from './StarterPromptPage.actions';
import type { IStarterPromptPageProps, IStarterPromptPageState } from './StarterPromptPage.models';
import { IStarterPromptPageService } from '../../AIAssistant.services';
export declare const useStarterPromptPage: (props: IStarterPromptPageProps, service: IStarterPromptPageService) => {
    state: IStarterPromptPageState;
    actions: IStarterPromptPageActions;
};
