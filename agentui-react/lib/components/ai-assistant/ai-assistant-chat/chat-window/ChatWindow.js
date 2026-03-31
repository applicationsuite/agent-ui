import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useAIAssistantChatStyles } from '../AIAssistantChat.styles';
import { ChatArea } from './chat-area/ChatArea';
import { ChatInput } from './chat-input/ChatInput';
import { PromptParameterForm } from './prompt-parameter-form/PromptParameterForm';
import { StarterPromptSuggesstion } from './starter-prompt-suggesstion/StarterPromptSuggesstion';
export const ChatWindow = (props) => {
    const { models, selectedModel, activeConversation, activeConversationMessages, inputValue, starterPrompts, isDeveloperMode, isAguiInProgress, aguiRawData, activeParameterizedPrompt, events, resolveTemplate, focusTrigger, } = props;
    const { onSelectStarterPrompt, onPromptFormSubmit, onPromptFormCancel, onInputChange, onModelChange, onFileUpload, onFileRemove, onSendMessage, onCancelMessage, } = events;
    const classes = useAIAssistantChatStyles();
    const promptForm = activeParameterizedPrompt && (_jsx("div", { className: classes.promptFormDock, children: _jsx("div", { className: classes.promptFormDockInner, children: _jsx(PromptParameterForm, { open: !!activeParameterizedPrompt, title: activeParameterizedPrompt.title, promptTemplate: activeParameterizedPrompt.prompt ?? '', parameters: activeParameterizedPrompt.parameters ?? [], templateType: activeParameterizedPrompt.templates?.[0] ?? 'placeholder_text', onSubmit: (resolved) => onPromptFormSubmit?.(resolved), onCancel: () => onPromptFormCancel?.() }) }) }));
    const chatInput = (_jsx(ChatInput, { models: models, selectedModel: selectedModel, inputValue: inputValue, starterPrompts: starterPrompts, isPromptProcessing: isAguiInProgress ?? false, focusTrigger: focusTrigger, onSelectStarterPrompt: onSelectStarterPrompt, onInputChange: onInputChange, onModelChange: onModelChange, onFileUpload: onFileUpload, onFileRemove: onFileRemove, onSendMessage: onSendMessage, onCancelMessage: onCancelMessage }));
    if (activeConversation) {
        return (_jsxs("div", { className: classes.root, children: [_jsx(ChatArea, { activeConversation: activeConversation, messages: activeConversationMessages, isDeveloperMode: isDeveloperMode, isAguiInProgress: isAguiInProgress, aguiRawData: aguiRawData, resolveTemplate: resolveTemplate }), promptForm, chatInput] }));
    }
    return (_jsx("div", { className: classes.root, children: _jsxs("div", { className: classes.welcomeContainer, children: [_jsxs("h1", { className: classes.welcomeHeading, children: [_jsx("span", { className: classes.welcomeHeadingStrong, children: "Hello," }), "How can I assist you?"] }), _jsxs("div", { className: classes.welcomeComposerContainer, children: [promptForm, chatInput, !activeParameterizedPrompt && (_jsx(StarterPromptSuggesstion, { prompts: starterPrompts, onSelectPrompt: onSelectStarterPrompt }))] })] }) }));
};
