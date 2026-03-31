export declare const createInitialFormState: (defaultAgentName?: string) => {
    agentName: string;
    parameters: string[];
    prompt: string;
    tags: string[];
    title: string;
};
export declare const normalizeParameterName: (value: string) => string;
export declare const normalizeStringList: (values?: string[] | null) => string[];
export interface IParameterSuggestionContext {
    triggerStart: number;
    cursor: number;
    query: string;
}
export interface IParameterSuggestionPosition {
    top: number;
    left: number;
}
export declare const PARAMETER_SUGGESTION_WIDTH = 220;
export declare const PARAMETER_SUGGESTION_MAX_HEIGHT = 140;
export declare const mergeUniqueParameters: (existing: string[], incoming: string[]) => string[];
export declare const getParameterSuggestionContext: (promptValue: string, caretPosition: number) => IParameterSuggestionContext | null;
export declare const getTextAreaCaretCoordinates: (textArea: HTMLTextAreaElement, position: number) => {
    top: number;
    left: number;
    lineHeight: number;
};
export declare const includesValue: (values: string[], candidate: string) => boolean;
export declare const extractParameters: (promptText: string) => string[];
export declare const removeParameterPlaceholders: (promptText: string, parameter: string) => string;
export declare const getPromptPreview: (promptText: string, fallbackText?: string) => string;
