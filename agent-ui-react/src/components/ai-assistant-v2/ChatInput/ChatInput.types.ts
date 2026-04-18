import type { StarterPrompt } from "../services/types";

export interface ChatInputProps {
	isStreaming: boolean;
	onSend: (text: string) => void;
	onAbort: () => void;
	onFileSelect?: (file: File) => void;
	starterPrompts?: StarterPrompt[];
}
