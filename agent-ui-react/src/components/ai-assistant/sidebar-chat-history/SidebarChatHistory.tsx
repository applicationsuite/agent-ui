import { Search12Regular } from "@fluentui/react-icons";
import { useAIAssistantStyles } from "../AIAssistant.styles";
import { useConversationHistory } from "../extensions/conversation-history/useConversationHistory";
import { getTimeAgo } from "../extensions/conversation-history/ConversationHistory.utils";

export const SidebarChatHistory = ({ onSelect }: { onSelect: () => void }) => {
	const classes = useAIAssistantStyles();
	const {
		service,
		filtered,
		loading,
		searchQuery,
		setSearchQuery,
		handleSelect,
	} = useConversationHistory();

	if (!service) return null;

	return (
		<div className={classes.sidebarHistorySection}>
			<div className={classes.sidebarHistoryHeader}>
				<span className={classes.sidebarHistoryTitle}>Recent</span>
			</div>
			<div className={classes.sidebarSearchWrap}>
				<Search12Regular className={classes.sidebarSearchIcon} />
				<input
					className={classes.sidebarSearchInput}
					placeholder="Search chats"
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
				/>
			</div>
			<div className={classes.sidebarHistoryList}>
				{loading ? (
					<div className={classes.sidebarHistoryEmpty}>Loading…</div>
				) : filtered.length === 0 ? (
					<div className={classes.sidebarHistoryEmpty}>
						{searchQuery ? "No matches" : "No conversations yet"}
					</div>
				) : (
					filtered.map((c) => (
						<button
							key={c.id}
							className={classes.sidebarHistoryItem}
							type="button"
							title={`${c.firstMessageText} · ${getTimeAgo(c.lastActivityAt)}`}
							onClick={() => handleSelect(c, onSelect)}
						>
							{c.firstMessageText}
						</button>
					))
				)}
			</div>
		</div>
	);
};
