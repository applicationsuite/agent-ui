import { type PointerEvent as ReactPointerEvent } from 'react';
import { IAIAssistantChatActions, IAIAssistantChatState } from './AIAssistantChat.actions';
import { IAssistantChatProps } from './AIAssistantChat.models';
export declare const useInit: (_props: IAssistantChatProps) => {
    state: IAIAssistantChatState;
    actions: IAIAssistantChatActions;
};
export declare const useSidePanelResize: (isEnabled: boolean, defaultWidth?: number) => {
    sidePanelWidth: number;
    isResizingSidePanel: boolean;
    onResizeStart: (event: ReactPointerEvent<HTMLDivElement>) => void;
    onResetWidth: () => void;
};
