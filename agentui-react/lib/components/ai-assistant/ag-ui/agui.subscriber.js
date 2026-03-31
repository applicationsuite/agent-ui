/**
 * Creates an AG-UI subscriber that streams text into an accumulator
 * and invokes `onUpdate` after every relevant event so the UI can
 * update incrementally.
 */
export const createAGUISubscriber = (acc, onUpdate) => ({
    onTextMessageStartEvent: () => {
        acc.text = '';
    },
    onTextMessageContentEvent: (params) => {
        acc.text = params.textMessageBuffer;
        onUpdate();
    },
    onTextMessageEndEvent: (params) => {
        acc.text = params.textMessageBuffer || acc.text;
        onUpdate();
    },
    onStepStartedEvent: (params) => {
        console.log('[AG-UI] Step started:', params.event.stepName);
    },
    onStepFinishedEvent: (params) => {
        console.log('[AG-UI] Step finished:', params.event.stepName);
    },
    onToolCallStartEvent: (params) => {
        const toolCall = {
            id: params.event.toolCallId,
            name: params.event
                .toolCallName ??
                params.event.name ??
                'unknown',
            args: '',
            done: false,
        };
        acc.toolCalls.set(toolCall.id, toolCall);
        console.log('[AG-UI] Tool call started:', toolCall.id, toolCall.name);
    },
    onToolCallArgsEvent: (params) => {
        const tc = acc.toolCalls.get(params.event.toolCallId);
        if (tc) {
            tc.args = (tc.args || '') + params.event.delta;
        }
    },
    onToolCallEndEvent: (params) => {
        const tc = acc.toolCalls.get(params.event.toolCallId);
        if (tc) {
            tc.done = true;
            console.log('[AG-UI] Tool call ended:', tc.id, tc.name);
        }
    },
    onToolCallResultEvent: (params) => {
        const tc = acc.toolCalls.get(params.event.toolCallId);
        if (tc) {
            tc.result =
                typeof params.event.content === 'string'
                    ? params.event.content
                    : JSON.stringify(params.event.content);
            console.log('[AG-UI] Tool result received:', tc.name, tc.result?.substring(0, 200));
            onUpdate();
        }
    },
    onRunErrorEvent: (params) => {
        acc.error = params.event.message;
        onUpdate();
    },
    onRunFinishedEvent: () => {
        onUpdate();
    },
    onRunFailed: (params) => {
        acc.error = params.error.message;
        onUpdate();
    },
});
/**
 * Process tool results from newMessages after run completes,
 * filling in any results not captured by streaming events.
 */
export const processToolResults = (newMessages, acc) => {
    for (const msg of newMessages) {
        if (msg.role === 'tool' && msg.toolCallId) {
            const tc = acc.toolCalls.get(msg.toolCallId);
            if (tc && !tc.result) {
                tc.result =
                    typeof msg.content === 'string'
                        ? msg.content
                        : JSON.stringify(msg.content);
            }
        }
    }
};
