import { jsx as _jsx } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { AIAssistantDisplayMode, } from './AIAssistant.models';
import { useInit } from './AIAssistant.hooks';
import { useAIAssistantStyles } from './AIAssistant.styles';
import { AIAssistantChat } from './ai-assistant-chat';
import { AiAssistantContext } from './AiAssistant.context';
import { mergeClasses } from '@fluentui/react-components';
const resolveDisplayMode = (displayMode) => displayMode ?? AIAssistantDisplayMode.FullScreen;
export const AIAssistant = (props) => {
    const { theme, displayMode, agents, greetingText, headerText, className, onClosePanel, userInfo, permissions = [], } = props;
    const classes = useAIAssistantStyles();
    const { state, actions, service } = useInit(props);
    const [currentDisplayMode, setCurrentDisplayMode] = useState(() => resolveDisplayMode(displayMode));
    useEffect(() => {
        setCurrentDisplayMode(resolveDisplayMode(displayMode));
    }, [displayMode]);
    const handleAction = (action, payload) => {
        return actions.handleAction(action, payload);
    };
    const handleToggleDisplayMode = useCallback(() => {
        setCurrentDisplayMode((previousMode) => previousMode === AIAssistantDisplayMode.SidePanel
            ? AIAssistantDisplayMode.FullScreen
            : AIAssistantDisplayMode.SidePanel);
    }, []);
    const contextValue = useMemo(() => ({ theme, userInfo, permissions, service }), [theme, userInfo, permissions, service]);
    return (_jsx(AiAssistantContext.Provider, { value: contextValue, children: _jsx("div", { className: mergeClasses(classes.root, className), children: _jsx(AIAssistantChat, { displayMode: currentDisplayMode, agents: agents, greetingText: greetingText, headerText: headerText, onClosePanel: onClosePanel, models: state.models, selectedModel: state.selectedModel, starterPrompts: state.starterPrompts, templates: state.templates, conversationHistory: state.conversationHistory, activeConversation: state.activeConversation, activeConversationMessages: state.activeConversationMessages, isAguiInProgress: state.isAguiInProgress, aguiRawData: state.aguiRawData, onAction: handleAction, onToggleDisplayMode: handleToggleDisplayMode, resolveTemplate: actions.resolveTemplate, features: props.features }) }) }));
};
