export interface UseSpeechRecognitionReturn {
    isSupported: boolean;
    isListening: boolean;
    interimTranscript: string;
    startListening: () => void;
    stopListening: () => void;
    abortListening: () => void;
}
export declare function useSpeechRecognition(onTranscript: (transcript: string) => void, onFinalResult: (transcript: string) => void, lang?: string): UseSpeechRecognitionReturn;
