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
	const skip =
		hasCustomRenderer ||
		message.role !== "assistant" ||
		!message.content?.trim();

	const [resolvedHtml, setResolvedHtml] = useState<string | undefined>(
		undefined,
	);
	const [isLoading, setIsLoading] = useState(!skip);

	const serviceRef = useRef(service);
	serviceRef.current = service;

	useEffect(() => {
		if (skip) {
			setIsLoading(false);
			return;
		}

		const svc = serviceRef.current;
		if (!svc) return;

		let disposed = false;

		// resolveMessage deduplicates by message.id — safe to call multiple times
		resolveMessage(message, svc)
			.then((html) => {
				if (!disposed) {
					setResolvedHtml(html);
					setIsLoading(false);
				}
			})
			.catch(() => {
				if (!disposed) {
					setResolvedHtml(undefined);
					setIsLoading(false);
				}
			});

		return () => {
			disposed = true;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [message.id, skip, service]);

	return { resolvedHtml, isLoading };
};
