import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useRef } from 'react';
import { mergeClasses } from '@fluentui/react-components';
import { MicRegular, DismissRegular, CheckmarkRegular, } from '@fluentui/react-icons';
import { useVoiceInputStyles } from './VoiceInput.styles';
import { useSpeechRecognition } from './useSpeechRecognition';
export const VoiceInput = (props) => {
    const { onStartRecording, onStopRecording, onTranscriptChange } = props;
    const classes = useVoiceInputStyles();
    const transcriptRef = useRef('');
    const handleTranscript = useCallback((transcript) => {
        transcriptRef.current = transcript;
        onTranscriptChange?.(transcript);
    }, [onTranscriptChange]);
    const { isSupported, isListening, interimTranscript, startListening, stopListening, abortListening, } = useSpeechRecognition(handleTranscript, handleTranscript);
    const handleStart = useCallback(() => {
        if (!isSupported)
            return;
        transcriptRef.current = '';
        onStartRecording();
        startListening();
    }, [isSupported, onStartRecording, startListening]);
    const handleCancel = useCallback(() => {
        transcriptRef.current = '';
        abortListening();
        onStopRecording('');
    }, [abortListening, onStopRecording]);
    const handleConfirm = useCallback(() => {
        stopListening();
        onStopRecording((transcriptRef.current || interimTranscript).trim());
    }, [stopListening, onStopRecording, interimTranscript]);
    return (_jsxs("div", { className: classes.root, children: [isListening && (_jsxs("div", { className: classes.listeningIndicator, children: [_jsx("span", { className: classes.listeningDot }), _jsx("span", { children: interimTranscript || 'Listening...' })] })), isListening ? (_jsxs(_Fragment, { children: [_jsx("button", { className: classes.actionButton, type: "button", title: "Cancel voice recording", "aria-label": "Cancel voice recording", onClick: handleCancel, children: _jsx(DismissRegular, { fontSize: 18 }) }), _jsx("button", { className: mergeClasses(classes.actionButton, classes.actionButtonConfirm), type: "button", title: "Use recorded text", "aria-label": "Use recorded text", onClick: handleConfirm, children: _jsx(CheckmarkRegular, { fontSize: 18 }) })] })) : (_jsx("button", { className: mergeClasses(classes.button, !isSupported && classes.buttonRecording), type: "button", title: isSupported
                    ? 'Start voice recording'
                    : 'Speech recognition is not supported in this browser', "aria-label": "Start voice recording", onClick: handleStart, disabled: !isSupported, children: _jsx(MicRegular, { fontSize: 20 }) }))] }));
};
