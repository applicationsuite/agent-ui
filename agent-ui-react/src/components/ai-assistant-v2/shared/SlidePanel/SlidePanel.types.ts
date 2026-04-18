import type { ReactNode } from "react";

export interface SlidePanelButtons {
	submitLabel?: string;
	cancelLabel?: string;
	submitDisabled?: boolean;
	onSubmit?: () => void;
	onCancel?: () => void;
}

export interface SlidePanelProps {
	title: string;
	icon?: ReactNode;
	children: ReactNode;
	buttons?: SlidePanelButtons;
	disabled?: boolean;
	error?: string;
	onClose?: () => void;
}
