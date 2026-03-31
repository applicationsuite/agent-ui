import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect, useCallback } from 'react';
import { useAIAssistantChatStyles } from '../../AIAssistantChat.styles';
const VISIBLE_COUNT = 10;
const SHIMMER_ROW_1_WIDTHS = [190, 160, 175, 165, 155];
const SHIMMER_ROW_2_WIDTHS = [125, 105, 150, 180, 120, 70];
const StarterPromptSkeleton = () => {
    const classes = useAIAssistantChatStyles();
    return (_jsxs("div", { className: classes.starterPromptSkeletonContainer, children: [_jsx("div", { className: classes.starterPromptSkeletonRow, children: SHIMMER_ROW_1_WIDTHS.map((w, i) => (_jsx("div", { className: classes.starterPromptShimmerChip, style: { width: `${w}px` } }, `row-1-${i}`))) }), _jsx("div", { className: classes.starterPromptSkeletonRow, children: SHIMMER_ROW_2_WIDTHS.map((w, i) => (_jsx("div", { className: classes.starterPromptShimmerChip, style: { width: `${w}px` } }, `row-2-${i}`))) })] }));
};
export const StarterPromptSuggesstion = (props) => {
    const { prompts, onSelectPrompt } = props;
    const classes = useAIAssistantChatStyles();
    const [showOverflow, setShowOverflow] = useState(false);
    const dropdownRef = useRef(null);
    const isLoading = prompts?.loading ?? false;
    const promptList = prompts?.data ?? [];
    const visiblePrompts = promptList.slice(0, VISIBLE_COUNT);
    const overflowPrompts = promptList.slice(VISIBLE_COUNT);
    const hasOverflow = overflowPrompts.length > 0;
    useEffect(() => {
        if (!showOverflow)
            return;
        const handleClickOutside = (e) => {
            if (dropdownRef.current &&
                !dropdownRef.current.contains(e.target)) {
                setShowOverflow(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showOverflow]);
    const handleOverflowSelect = useCallback((prompt) => {
        setShowOverflow(false);
        onSelectPrompt(prompt);
    }, [onSelectPrompt]);
    if (isLoading) {
        return _jsx(StarterPromptSkeleton, {});
    }
    if (promptList.length === 0) {
        return null;
    }
    return (_jsxs("div", { className: classes.starterPrompts, children: [visiblePrompts.map((prompt, idx) => (_jsx("button", { type: "button", className: classes.starterPromptChip, onClick: () => onSelectPrompt(prompt), children: prompt.title }, `${prompt.id}-${idx}`))), hasOverflow && (_jsxs("div", { className: classes.starterPromptMoreWrapper, ref: dropdownRef, children: [_jsxs("button", { className: classes.starterPromptMoreChip, onClick: () => setShowOverflow((prev) => !prev), type: "button", children: ["+", overflowPrompts.length, " more"] }), showOverflow && (_jsx("div", { className: classes.starterPromptOverflowDropdown, children: overflowPrompts.map((prompt, idx) => (_jsx("button", { className: classes.starterPromptOverflowItem, onClick: () => handleOverflowSelect(prompt), type: "button", children: prompt.title }, `${prompt.id}-overflow-${idx}`))) }))] }))] }));
};
