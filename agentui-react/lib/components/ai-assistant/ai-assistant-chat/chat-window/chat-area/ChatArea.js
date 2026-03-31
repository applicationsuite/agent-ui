import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo } from 'react';
import { mergeClasses, Skeleton, SkeletonItem, } from '@fluentui/react-components';
import { SparkleRegular } from '@fluentui/react-icons';
import { MessageRenderer } from './message-renderer/MessageRenderer';
import { useAIAssistantChatStyles } from '../../AIAssistantChat.styles';
import { formatMessageTime } from '../../AIAssistantChat.utils';
import { useTemplateCache } from './useTemplateCache';
import { useAutoScroll } from './useAutoScroll';
import { LazyMessage } from './LazyMessage';
const TYPING_DOT_CLASSES = ['typingDot1', 'typingDot2', 'typingDot3'];
export const ChatArea = (props) => {
    const { activeConversation, messages, isDeveloperMode, isAguiInProgress, aguiRawData, resolveTemplate, } = props;
    const classes = useAIAssistantChatStyles();
    const messageItems = messages?.data ?? [];
    const templateCache = useTemplateCache();
    // Clear template cache when conversation changes
    useEffect(() => {
        templateCache.clear();
    }, [activeConversation?.id]);
    const { scrollRef } = useAutoScroll(messageItems.length);
    const latestUserTextByIndex = useMemo(() => {
        const map = new Map();
        let latestUserText;
        for (let i = 0; i < messageItems.length; i++) {
            if (messageItems[i].role === 'user') {
                latestUserText = messageItems[i].messageText;
            }
            map.set(i, latestUserText);
        }
        return map;
    }, [messageItems]);
    if (!activeConversation) {
        return null;
    }
    if (messages?.loading && (messages.data?.length ?? 0) === 0) {
        return (_jsx("div", { className: classes.thread, children: _jsxs(Skeleton, { animation: "pulse", children: [_jsxs("div", { className: classes.userBlock, children: [_jsx(SkeletonItem, { size: 12, style: { width: '60px' } }), _jsx(SkeletonItem, { size: 36, style: { width: '45%', alignSelf: 'flex-end' } })] }), _jsxs("div", { className: classes.assistantBlock, children: [_jsx(SkeletonItem, { shape: "circle", size: 28 }), _jsx(SkeletonItem, { size: 48, style: { width: '70%' } })] }), _jsxs("div", { className: classes.userBlock, children: [_jsx(SkeletonItem, { size: 12, style: { width: '60px' } }), _jsx(SkeletonItem, { size: 28, style: { width: '35%', alignSelf: 'flex-end' } })] }), _jsxs("div", { className: classes.assistantBlock, children: [_jsx(SkeletonItem, { shape: "circle", size: 28 }), _jsx(SkeletonItem, { size: 64, style: { width: '60%' } })] })] }) }));
    }
    if (messages?.error && (messages.data?.length ?? 0) === 0) {
        return _jsx("div", { className: classes.thread, children: messages.error });
    }
    const eagerThreshold = messageItems.length - 6;
    return (_jsxs("div", { ref: scrollRef, className: classes.thread, children: [messageItems.map((message, index) => {
                const isEager = index >= eagerThreshold;
                if (message.role === 'user') {
                    return (_jsx(LazyMessage, { className: classes.messageItem, estimatedHeight: 60, eager: isEager, children: _jsxs("div", { className: classes.userBlock, children: [_jsx("span", { className: classes.userTime, children: formatMessageTime(message.timestamp) }), _jsx("div", { className: classes.userBubble, children: message.messageText })] }) }, `${message.id ?? 'msg'}-${index}`));
                }
                return (_jsx(LazyMessage, { className: classes.messageItem, estimatedHeight: 150, eager: isEager, children: _jsx(MessageRenderer, { message: message, userMessageText: latestUserTextByIndex.get(index), resolveTemplate: resolveTemplate, cachedResolved: message.id ? templateCache.get(message.id) : undefined, onResolved: templateCache.onResolved }) }, `${message.id ?? 'msg'}-${index}`));
            }), isAguiInProgress && (_jsxs("div", { className: classes.assistantBlock, children: [_jsxs("div", { className: classes.assistantPreamble, children: [_jsx("span", { className: classes.avatar, children: _jsx(SparkleRegular, { fontSize: 18 }) }), isDeveloperMode ? (_jsx("span", { className: classes.devModeLabel, children: "RAW OUTPUT" })) : (_jsx("div", { className: classes.typingIndicator, children: TYPING_DOT_CLASSES.map((cls) => (_jsx("span", { className: mergeClasses(classes.typingDot, classes[cls]) }, cls))) }))] }), isDeveloperMode && (_jsx("div", { className: classes.localAssistantBubble, children: _jsx("pre", { className: classes.rawOutput, children: aguiRawData || 'Waiting for response...' }) }))] }))] }));
};
