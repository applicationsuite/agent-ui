import { useCallback, useEffect, useMemo, useState } from "react";
import { useAIAssistantContext } from "../../AIAssistant/AIAssistantContext";
import type { Conversation } from "../../services/types";

export const useConversationHistory = () => {
	const { service, newChat, setMessages } = useAIAssistantContext();
	const [conversations, setConversations] = useState<Conversation[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | undefined>();
	const [searchQuery, setSearchQuery] = useState("");

	useEffect(() => {
		if (!service) {
			setLoading(false);
			return;
		}
		service.getConversationHistory().then((result) => {
			if (result.data) {
				const sorted = [...result.data].sort(
					(a, b) =>
						new Date(b.lastActivityAt).getTime() -
						new Date(a.lastActivityAt).getTime(),
				);
				setConversations(sorted);
			}
			if (result.error) setError(result.error);
			setLoading(false);
		});
	}, [service]);

	const filtered = useMemo(() => {
		if (!searchQuery.trim()) return conversations;
		const q = searchQuery.toLowerCase();
		return conversations.filter((c) =>
			c.firstMessageText.toLowerCase().includes(q),
		);
	}, [conversations, searchQuery]);

	const handleSelect = useCallback(
		async (conversation: Conversation, onClose: () => void) => {
			if (!service) return;
			const result = await service.getConversationMessages(
				conversation.threadId,
			);
			if (result.data) {
				const mapped = result.data
					.filter((m) => m.role !== "system")
					.map((m) => ({
						id:
							m.id ??
							`msg-${Date.now()}-${Math.random().toString(36).slice(2)}`,
						role: m.role as "user" | "assistant",
						content: m.messageText,
						timestamp: m.timestamp,
					}));
				setMessages(mapped);
			}
			onClose();
		},
		[service, setMessages],
	);

	const handleNewChat = useCallback(
		(onClose: () => void) => {
			newChat();
			onClose();
		},
		[newChat],
	);

	return {
		service,
		conversations,
		filtered,
		loading,
		error,
		searchQuery,
		setSearchQuery,
		handleSelect,
		handleNewChat,
	};
};
