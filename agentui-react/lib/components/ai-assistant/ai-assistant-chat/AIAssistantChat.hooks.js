import { useCallback, useEffect, useReducer, useRef, useState, } from 'react';
import { aiAssistantChatReducer } from './AIAssistantChat.reducers';
import { AIAssistantChatActions, } from './AIAssistantChat.actions';
import { AssistantChatNavItem, } from './AIAssistantChat.models';
const initialState = {
    activeNavItem: AssistantChatNavItem.NewChat,
    isSidebarCollapsed: true,
    searchQuery: '',
    inputValue: '',
    isDeveloperMode: false,
    useRawResponse: false,
};
const SIDE_PANEL_DEFAULT_WIDTH = 560;
export const useInit = (_props) => {
    const [state, dispatch] = useReducer(aiAssistantChatReducer, initialState);
    const actions = new AIAssistantChatActions(dispatch, state);
    return { state, actions };
};
export const useSidePanelResize = (isEnabled, defaultWidth = SIDE_PANEL_DEFAULT_WIDTH) => {
    const [sidePanelWidth, setSidePanelWidth] = useState(defaultWidth);
    const [isResizingSidePanel, setIsResizingSidePanel] = useState(false);
    const resizeStateRef = useRef(null);
    const onResizeStart = useCallback((event) => {
        if (!isEnabled || event.button !== 0) {
            return;
        }
        resizeStateRef.current = {
            startX: event.clientX,
            startWidth: sidePanelWidth,
        };
        setIsResizingSidePanel(true);
        event.preventDefault();
    }, [isEnabled, sidePanelWidth]);
    const onResetWidth = useCallback(() => {
        setSidePanelWidth(defaultWidth);
    }, [defaultWidth]);
    useEffect(() => {
        if (isEnabled) {
            return;
        }
        resizeStateRef.current = null;
        setIsResizingSidePanel(false);
    }, [isEnabled]);
    useEffect(() => {
        if (!isEnabled || !isResizingSidePanel) {
            return;
        }
        const handlePointerMove = (event) => {
            const resizeState = resizeStateRef.current;
            if (!resizeState) {
                return;
            }
            const delta = resizeState.startX - event.clientX;
            const nextWidth = Math.max(0, resizeState.startWidth + delta);
            setSidePanelWidth(nextWidth);
        };
        const stopResizing = () => {
            resizeStateRef.current = null;
            setIsResizingSidePanel(false);
        };
        document.body.style.userSelect = 'none';
        document.body.style.cursor = 'col-resize';
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', stopResizing);
        window.addEventListener('pointercancel', stopResizing);
        return () => {
            document.body.style.userSelect = '';
            document.body.style.cursor = '';
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', stopResizing);
            window.removeEventListener('pointercancel', stopResizing);
        };
    }, [isEnabled, isResizingSidePanel]);
    return {
        sidePanelWidth,
        isResizingSidePanel,
        onResizeStart,
        onResetWidth,
    };
};
