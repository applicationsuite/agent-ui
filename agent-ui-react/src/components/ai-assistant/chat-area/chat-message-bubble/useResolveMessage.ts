import { useEffect, useRef, useState } from "react";
import type { IChatMessage } from "../../AIAssistant.types";
import type { IAIAssistantService } from "../../AIAssistant.services";
import { resolveMessage } from "../../AIAssistant.utils";

export interface IUseResolveMessageResult {
	resolvedHtml: string | undefined;
	isLoading: boolean;
}

export const useResolveMessage = (
	message: IChatMessage,
	service: IAIAssistantService | undefined,
	hasCustomRenderer: boolean,
): IUseResolveMessageResult => {
	const [resolvedHtml, setResolvedHtml] = useState<string | undefined>(
		message.data?.__resolvedHtml as string | undefined,
	);
	const [isLoading, setIsLoading] = useState(false);
	const resolvedRef = useRef(false);

	useEffect(() => {
		// Already resolved, has a custom renderer, not an assistant message,
		// or no data to resolve — skip.
		if (
			resolvedRef.current ||
			hasCustomRenderer ||
			message.role !== "assistant" ||
			!message.data ||
			!service
		) {
			return;
		}

		// If already resolved from a previous load
		if (message.data.__resolvedHtml || message.data.__templateConfig) {
			resolvedRef.current = true;
			setResolvedHtml(message.data.__resolvedHtml as string | undefined);
			return;
		}

		let disposed = false;
		resolvedRef.current = true;
		setIsLoading(true);

		resolveMessage(message, service)
			.then((html) => {
				if (!disposed) setResolvedHtml(html);
			})
			.catch(() => {
				/* fall through to raw string */
			})
			.finally(() => {
				if (!disposed) setIsLoading(false);
			});

		return () => {
			disposed = true;
		};
	}, [message, service, hasCustomRenderer]);

	return { resolvedHtml, isLoading };
};
