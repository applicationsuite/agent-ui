export interface VoiceInputProps {
	onStartRecording: () => void;
	onStopRecording: (message: string) => void;
	onTranscriptChange?: (message: string) => void;
}

export interface VoiceInputHandle {
	stop: () => void;
}
