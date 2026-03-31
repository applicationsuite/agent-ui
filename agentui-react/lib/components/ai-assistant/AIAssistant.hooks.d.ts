import { IAIAssistantActions } from './AIAssistant.actions';
import { IAIAssistantProps, IAIAssistantState } from './AIAssistant.models';
import { IAIAssistantService } from './AIAssistant.services';
export declare const useInit: (props: IAIAssistantProps) => {
    state: IAIAssistantState;
    actions: IAIAssistantActions;
    service: IAIAssistantService;
};
