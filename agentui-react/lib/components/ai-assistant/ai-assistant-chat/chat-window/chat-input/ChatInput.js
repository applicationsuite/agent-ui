import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useMemo, useRef } from 'react';
import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger, mergeClasses, } from '@fluentui/react-components';
import { AttachRegular, SendRegular, DesktopRegular, ChevronDownRegular, Stop16Filled, } from '@fluentui/react-icons';
import { useChatInputStyles } from './ChatInput.styles';
import { useAutoFocus, useChatInputState, useAutocompleteSuggestions, useVoiceInput, } from './ChatInput.hooks';
import { VoiceInput } from './voice-input/VoiceInput';
export const ChatInput = (props) => {
    const { models, selectedModel, inputValue, starterPrompts, isPromptProcessing, focusTrigger, onSelectStarterPrompt, onInputChange, onModelChange, onSendMessage, onCancelMessage, } = props;
    const classes = useChatInputStyles();
    const textareaRef = useRef(null);
    const availableModels = models?.data ?? [];
    const defaultSelectedModel = selectedModel?.value ?? availableModels[0]?.value ?? 'gpt-4.1';
    useAutoFocus(textareaRef, focusTrigger);
    const { state, setState } = useChatInputState(inputValue, defaultSelectedModel);
    const selectedModelLabel = useMemo(() => availableModels.find((model) => model.value === state.selectedModel)
        ?.label ?? state.selectedModel, [availableModels, state.selectedModel]);
    const { showSuggestions, setShowSuggestions, selectedIndex: selectedSuggestionIndex, setSelectedIndex: setSelectedSuggestionIndex, filtered: filteredSuggestions, select: handleSelectSuggestion, } = useAutocompleteSuggestions(state.inputValue, starterPrompts?.data, onSelectStarterPrompt);
    const voice = useVoiceInput(state.inputValue, setState, onInputChange);
    const handleInputChange = useCallback((e) => {
        const value = e.target.value;
        setState((prev) => ({ ...prev, inputValue: value }));
        onInputChange(value);
        setShowSuggestions(value.trim().length > 0);
    }, [onInputChange]);
    const handleSend = useCallback(() => {
        if (!state.inputValue.trim() || isPromptProcessing)
            return;
        setShowSuggestions(false);
        onSendMessage();
        setState((prev) => ({ ...prev, inputValue: '' }));
    }, [state.inputValue, isPromptProcessing, onSendMessage]);
    const handleModelSelect = useCallback((modelValue) => {
        setState((prev) => ({ ...prev, selectedModel: modelValue }));
        onModelChange(modelValue);
    }, [onModelChange]);
    const handleKeyDown = useCallback((e) => {
        const hasSuggestions = showSuggestions && filteredSuggestions.length > 0;
        if (hasSuggestions) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                setSelectedSuggestionIndex((prev) => prev < filteredSuggestions.length - 1 ? prev + 1 : 0);
                return;
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                setSelectedSuggestionIndex((prev) => prev > 0 ? prev - 1 : filteredSuggestions.length - 1);
                return;
            }
            if (e.key === 'Enter' && !e.shiftKey && selectedSuggestionIndex >= 0) {
                e.preventDefault();
                handleSelectSuggestion(filteredSuggestions[selectedSuggestionIndex]);
                return;
            }
            if (e.key === 'Escape') {
                e.preventDefault();
                setShowSuggestions(false);
                return;
            }
        }
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    }, [
        handleSend,
        showSuggestions,
        filteredSuggestions,
        selectedSuggestionIndex,
        handleSelectSuggestion,
    ]);
    const hasInput = state.inputValue.trim().length > 0;
    return (_jsxs("div", { className: classes.wrapper, children: [showSuggestions && filteredSuggestions.length > 0 && (_jsx("div", { className: classes.suggestionsDropdown, children: filteredSuggestions.map((sp, index) => (_jsxs("button", { className: mergeClasses(classes.suggestionItem, index === selectedSuggestionIndex &&
                        classes.suggestionItemActive), onMouseDown: (e) => {
                        e.preventDefault();
                        handleSelectSuggestion(sp);
                    }, onMouseEnter: () => setSelectedSuggestionIndex(index), type: "button", children: [_jsx("div", { className: classes.suggestionTitle, children: sp.title }), _jsx("div", { className: classes.suggestionPrompt, children: sp.prompt })] }, sp.id ?? index))) })), _jsxs("div", { className: classes.composer, children: [_jsx("textarea", { ref: textareaRef, className: classes.textarea, placeholder: "Ask anything", value: state.inputValue, onChange: handleInputChange, onKeyDown: handleKeyDown, onFocus: () => {
                            if (state.inputValue.trim().length > 0)
                                setShowSuggestions(true);
                        }, onBlur: () => {
                            // Small delay so mousedown on suggestion fires before blur hides it
                            setTimeout(() => setShowSuggestions(false), 150);
                        }, rows: 1 }), _jsxs("div", { className: classes.footer, children: [_jsxs("div", { className: classes.leftTools, children: [_jsxs(Menu, { positioning: "below-start", children: [_jsx(MenuTrigger, { disableButtonEnhancement: true, children: _jsxs("button", { className: classes.modelButton, type: "button", children: [_jsx(DesktopRegular, { fontSize: 16 }), _jsx("span", { children: selectedModelLabel }), _jsx(ChevronDownRegular, { fontSize: 12 })] }) }), _jsx(MenuPopover, { children: _jsx(MenuList, { children: availableModels.map((model) => (_jsx(MenuItem, { onClick: () => handleModelSelect(model.value), children: model.label }, model.value))) }) })] }), _jsx("button", { className: classes.iconButton, title: "Attach file", "aria-label": "Attach file", children: _jsx(AttachRegular, { fontSize: 20 }) })] }), _jsxs("div", { className: classes.rightTools, children: [_jsx(VoiceInput, { onStartRecording: voice.handleStart, onTranscriptChange: voice.handleTranscript, onStopRecording: voice.handleStop }), isPromptProcessing ? (_jsx("button", { className: mergeClasses(classes.sendButton, classes.stopButton), onClick: onCancelMessage, title: "Stop generating", "aria-label": "Stop generating", children: _jsx(Stop16Filled, {}) })) : (_jsx("button", { className: mergeClasses(classes.sendButton, hasInput && classes.sendButtonActive), onClick: handleSend, disabled: !hasInput, title: "Send message", "aria-label": "Send message", children: _jsx(SendRegular, { fontSize: 20 }) }))] })] })] })] }));
};
