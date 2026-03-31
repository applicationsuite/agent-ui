import { IChatInputProps, IChatInputState } from './ChatInput.models';
/**
 * Focuses the textarea on mount and whenever the panel becomes visible
 * (handles `display: none` → visible transitions via IntersectionObserver).
 * Also re-focuses when `focusTrigger` changes (e.g. New Chat).
 */
export declare const useAutoFocus: (textareaRef: React.RefObject<HTMLTextAreaElement | null>, focusTrigger?: number) => void;
/** Core input state: value, selected model, recording flag. */
export declare const useChatInputState: (inputValue: string, defaultSelectedModel: string) => {
    state: IChatInputState;
    setState: import("react").Dispatch<import("react").SetStateAction<IChatInputState>>;
};
/** Autocomplete suggestions filtered from starter prompts. */
export declare const useAutocompleteSuggestions: (inputValue: string, allPrompts: IChatInputProps["starterPrompts"]["data"], onSelectStarterPrompt: IChatInputProps["onSelectStarterPrompt"]) => {
    showSuggestions: boolean;
    setShowSuggestions: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    selectedIndex: number;
    setSelectedIndex: import("react").Dispatch<import("react").SetStateAction<number>>;
    filtered: import("../../..").IAIAssistantStarterPrompt[];
    select: (sp: import("../../..").IAIAssistantStarterPrompt) => void;
};
/** Voice input recording handlers. */
export declare const useVoiceInput: (currentInputValue: string, setState: React.Dispatch<React.SetStateAction<IChatInputState>>, onInputChange: (value: string) => void) => {
    handleStart: () => void;
    handleTranscript: (message: string) => void;
    handleStop: (message: string) => void;
};
