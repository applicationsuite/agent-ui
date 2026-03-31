import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import { SparkleRegular } from '@fluentui/react-icons';
import { CANCELLED_MESSAGE, extractCustomPrompt, extractDisplayText, parseStructuredPayload, } from '../../../../AIAssistant.utils';
import { formatMessageTime } from '../../../AIAssistantChat.utils';
import { useDynamicTemplateRendererStyles } from './DynamicTemplateRenderer.styles';
import { IsolatedHtmlRenderer } from '../IsolatedHtmlRenderer';
const isNonArrayObject = (val) => typeof val === 'object' && val !== null && !Array.isArray(val);
export const DynamicTemplateRenderer = (props) => {
    const { getTemplate, message, userMessageText, renderDynamicTemplate } = props;
    const classes = useDynamicTemplateRendererStyles();
    const [generatedHtml, setGeneratedHtml] = useState();
    const parsedSerialized = useMemo(() => {
        if (!message.serializedMessage)
            return undefined;
        try {
            const parsed = JSON.parse(message.serializedMessage);
            return isNonArrayObject(parsed) ? parsed : undefined;
        }
        catch {
            return undefined;
        }
    }, [message.serializedMessage]);
    const preGeneratedHtml = useMemo(() => {
        if (typeof parsedSerialized?.__generatedHtml === 'string') {
            return parsedSerialized.__generatedHtml;
        }
        return undefined;
    }, [parsedSerialized]);
    const payload = useMemo(() => {
        if (!message.serializedMessage) {
            return parseStructuredPayload(message.messageText);
        }
        if (parsedSerialized?.__payload) {
            return parsedSerialized.__payload;
        }
        return (parseStructuredPayload(message.serializedMessage) ??
            parseStructuredPayload(message.messageText));
    }, [message.messageText, message.serializedMessage, parsedSerialized]);
    const displayText = useMemo(() => extractDisplayText(message, payload), [message, payload]);
    const { templateId, templateData } = useMemo(() => {
        if (!isNonArrayObject(payload)) {
            return {
                templateId: undefined,
                templateData: {},
            };
        }
        const id = payload.templateId ?? payload.TemplateId ?? payload.template_id;
        const data = (isNonArrayObject(payload.data) ? payload.data : payload);
        return {
            templateId: id != null ? String(id) : undefined,
            templateData: data,
        };
    }, [payload]);
    const TemplateComponent = useMemo(() => {
        if (!templateId)
            return undefined;
        return getTemplate?.({ templateId, data: templateData });
    }, [getTemplate, templateId, templateData]);
    const customPrompt = useMemo(() => extractCustomPrompt(payload), [payload]);
    const isCancelled = displayText === CANCELLED_MESSAGE;
    const effectiveHtml = preGeneratedHtml ?? generatedHtml;
    const shouldGenerateDynamicUi = !isCancelled &&
        !TemplateComponent &&
        !preGeneratedHtml &&
        payload !== undefined;
    useEffect(() => {
        if (!shouldGenerateDynamicUi || !renderDynamicTemplate) {
            setGeneratedHtml(undefined);
            return;
        }
        let disposed = false;
        const abortController = new AbortController();
        void renderDynamicTemplate(userMessageText, payload, customPrompt, abortController.signal)
            .then((html) => {
            if (!disposed) {
                setGeneratedHtml(html);
            }
        })
            .catch((error) => {
            if (!abortController.signal.aborted) {
                console.error('[AIAssistant] Failed to generate dynamic UI.', error);
            }
        });
        return () => {
            disposed = true;
            abortController.abort();
        };
    }, [
        customPrompt,
        payload,
        renderDynamicTemplate,
        shouldGenerateDynamicUi,
        userMessageText,
    ]);
    return (_jsxs("div", { className: classes.assistantBlock, children: [_jsxs("div", { className: classes.assistantPreamble, children: [_jsx("span", { className: classes.avatar, children: _jsx(SparkleRegular, { fontSize: 18 }) }), _jsx("span", { children: formatMessageTime(message.timestamp) })] }), isCancelled ? (_jsx("span", { className: classes.cancelledMessage, children: displayText })) : TemplateComponent ? (_jsx("div", { className: classes.assistantCard, children: _jsx("div", { className: classes.localAssistantRichContent, children: _jsx(TemplateComponent, { data: templateData }) }) })) : effectiveHtml ? (_jsx("div", { className: classes.assistantCard, children: _jsx(IsolatedHtmlRenderer, { className: classes.generatedAssistantHtml, html: effectiveHtml }) })) : (_jsx("div", { className: classes.localAssistantBubble, children: displayText }))] }));
};
