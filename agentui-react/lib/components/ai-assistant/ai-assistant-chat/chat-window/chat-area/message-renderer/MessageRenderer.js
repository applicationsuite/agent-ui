import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useMemo, useState } from 'react';
import { Skeleton, SkeletonItem } from '@fluentui/react-components';
import { SparkleRegular, CopyRegular, CheckmarkRegular, } from '@fluentui/react-icons';
import { CANCELLED_MESSAGE, extractDisplayText, parseSerializedMessage, } from '../../../../AIAssistant.utils';
import { formatMessageTime } from '../../../AIAssistantChat.utils';
import { useMessageRendererStyles } from './MessageRenderer.styles';
import { useResolveTemplate } from './useResolveTemplate';
import { IsolatedHtmlRenderer } from '../IsolatedHtmlRenderer';
export const MessageRenderer = (props) => {
    const { message, userMessageText, resolveTemplate, cachedResolved, onResolved } = props;
    const classes = useMessageRendererStyles();
    const { preGeneratedHtml, payload } = useMemo(() => parseSerializedMessage(message), [message]);
    const displayText = useMemo(() => extractDisplayText(message, payload), [message, payload]);
    const isCancelled = displayText === CANCELLED_MESSAGE;
    const formattedJson = useMemo(() => {
        if (!displayText)
            return undefined;
        try {
            const parsed = JSON.parse(displayText);
            return JSON.stringify(parsed, null, 2);
        }
        catch {
            return undefined;
        }
    }, [displayText]);
    const [copied, setCopied] = useState(false);
    const handleCopy = useCallback(() => {
        const text = formattedJson ?? displayText;
        void navigator.clipboard.writeText(text).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    }, [formattedJson, displayText]);
    const { resolved, isLoading, templateData } = useResolveTemplate({
        messageId: message.id,
        payload,
        userMessageText,
        resolveTemplate,
        skip: isCancelled || !!preGeneratedHtml || payload === undefined,
        cachedResolved,
        onResolved,
    });
    const effectiveHtml = preGeneratedHtml ?? (resolved?.type === 'html' ? resolved.html : undefined);
    const { component: ResolvedComponent, data: resolvedData, onAction: resolvedOnAction, } = resolved?.type === 'component'
        ? resolved
        : { component: undefined, data: templateData, onAction: undefined };
    return (_jsxs("div", { className: classes.assistantBlock, children: [_jsxs("div", { className: classes.assistantPreamble, children: [_jsx("span", { className: classes.avatar, children: _jsx(SparkleRegular, { fontSize: 18 }) }), _jsx("span", { children: formatMessageTime(message.timestamp) })] }), isLoading ? (_jsx("div", { className: classes.assistantCard, children: _jsx(Skeleton, { animation: "pulse", children: _jsxs("div", { className: classes.shimmerColumn, children: [_jsx(SkeletonItem, { size: 16, style: { width: '40%' } }), _jsx(SkeletonItem, { size: 12, style: { width: '90%' } }), _jsx(SkeletonItem, { size: 12, style: { width: '75%' } }), _jsx(SkeletonItem, { size: 12, style: { width: '60%' } }), _jsxs("div", { className: classes.shimmerRow, children: [_jsx(SkeletonItem, { size: 32, style: { width: '30%' } }), _jsx(SkeletonItem, { size: 32, style: { width: '30%' } }), _jsx(SkeletonItem, { size: 32, style: { width: '30%' } })] })] }) }) })) : isCancelled ? (_jsx("span", { className: classes.cancelledMessage, children: displayText })) : ResolvedComponent ? (_jsx("div", { className: classes.assistantCard, children: _jsx("div", { className: classes.localAssistantRichContent, children: _jsx(ResolvedComponent, { data: resolvedData, onAction: resolvedOnAction }) }) })) : effectiveHtml ? (_jsx("div", { className: classes.assistantCard, children: _jsx(IsolatedHtmlRenderer, { className: classes.generatedAssistantHtml, html: effectiveHtml }) })) : formattedJson ? (_jsxs("div", { className: classes.rawJsonCard, children: [_jsxs("div", { className: classes.rawJsonHeader, children: [_jsx("span", { children: "JSON" }), _jsx("button", { type: "button", className: classes.rawJsonCopyButton, onClick: handleCopy, children: copied ? (_jsxs(_Fragment, { children: [_jsx(CheckmarkRegular, { fontSize: 12 }), " Copied"] })) : (_jsxs(_Fragment, { children: [_jsx(CopyRegular, { fontSize: 12 }), " Copy"] })) })] }), _jsx("pre", { className: classes.rawJsonPre, children: formattedJson })] })) : (_jsx("div", { className: classes.localAssistantBubble, children: displayText }))] }));
};
