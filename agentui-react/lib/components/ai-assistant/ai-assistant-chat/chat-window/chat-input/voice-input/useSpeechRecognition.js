import { useCallback, useEffect, useRef, useState } from 'react';
function getSpeechRecognitionCtor() {
    const win = window;
    return (win.SpeechRecognition ?? win.webkitSpeechRecognition);
}
export function useSpeechRecognition(onTranscript, onFinalResult, lang = 'en-US') {
    const [isListening, setIsListening] = useState(false);
    const [interimTranscript, setInterimTranscript] = useState('');
    const recognitionRef = useRef(null);
    const stoppingRef = useRef(false);
    const accumulatedRef = useRef('');
    const isSupported = typeof window !== 'undefined' && !!getSpeechRecognitionCtor();
    useEffect(() => {
        return () => {
            stoppingRef.current = true;
            recognitionRef.current?.abort();
        };
    }, []);
    const startListening = useCallback(() => {
        const SpeechRecognitionCtor = getSpeechRecognitionCtor();
        if (!SpeechRecognitionCtor) {
            return;
        }
        stoppingRef.current = true;
        recognitionRef.current?.abort();
        stoppingRef.current = false;
        accumulatedRef.current = '';
        const createRecognition = () => {
            const recognition = new SpeechRecognitionCtor();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = lang;
            recognitionRef.current = recognition;
            recognition.onstart = () => {
                setIsListening(true);
            };
            recognition.onresult = (event) => {
                let interim = '';
                let newFinal = '';
                for (let index = event.resultIndex; index < event.results.length; index++) {
                    const result = event.results[index];
                    if (result.isFinal) {
                        newFinal += result[0].transcript;
                    }
                    else {
                        interim += result[0].transcript;
                    }
                }
                if (newFinal) {
                    accumulatedRef.current = (accumulatedRef.current +
                        ' ' +
                        newFinal).trim();
                    setInterimTranscript('');
                    onFinalResult(accumulatedRef.current);
                }
                if (interim) {
                    const fullTranscript = accumulatedRef.current
                        ? `${accumulatedRef.current} ${interim}`
                        : interim;
                    setInterimTranscript(interim);
                    onTranscript(fullTranscript.trim());
                }
            };
            recognition.onerror = (_event) => {
                // Ignore transient no-speech and aborted states.
            };
            recognition.onend = () => {
                recognitionRef.current = null;
                if (!stoppingRef.current) {
                    try {
                        const nextRecognition = createRecognition();
                        nextRecognition.start();
                    }
                    catch {
                        setIsListening(false);
                    }
                }
                else {
                    setIsListening(false);
                    setInterimTranscript('');
                }
            };
            return recognition;
        };
        const recognition = createRecognition();
        recognition.start();
    }, [lang, onFinalResult, onTranscript]);
    const stopListening = useCallback(() => {
        stoppingRef.current = true;
        recognitionRef.current?.stop();
    }, []);
    const abortListening = useCallback(() => {
        stoppingRef.current = true;
        recognitionRef.current?.abort();
    }, []);
    return {
        isSupported,
        isListening,
        interimTranscript,
        startListening,
        stopListening,
        abortListening,
    };
}
