import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { mergeClasses } from '@fluentui/react-components';
import { SparkleRegular, AddRegular, ChatRegular, DocumentRegular, LightbulbRegular, PanelLeftRegular, SettingsRegular, } from '@fluentui/react-icons';
import { useChatNavBarStyles } from './ChatNavBar.styles';
import { AssistantChatNavItem } from '../AIAssistantChat.models';
import { AIAssistantFeature, hasFeature } from '../../AIAssistant.models';
import { ConversationHistoryPage } from '../conversation-history-page/ConversationHistoryPage';
import { ConversationHistoryDisplayLocation } from '../conversation-history-page/ConversationHistoryPage.models';
const navItems = [
    { key: AssistantChatNavItem.NewChat, label: 'New Chat', icon: AddRegular },
    { key: AssistantChatNavItem.Chats, label: 'Chats', icon: ChatRegular, feature: AIAssistantFeature.ConversationHistory },
    {
        key: AssistantChatNavItem.StarterPrompts,
        label: 'Starter Prompts',
        icon: LightbulbRegular,
        feature: AIAssistantFeature.StarterPrompts,
    },
    {
        key: AssistantChatNavItem.Templates,
        label: 'Templates',
        icon: DocumentRegular,
        feature: AIAssistantFeature.Templates,
    },
    {
        key: AssistantChatNavItem.Settings,
        label: 'Settings',
        icon: SettingsRegular,
        feature: AIAssistantFeature.Settings,
    },
];
export const ChatNavBar = (props) => {
    const { activeNavItem, isCollapsed, conversations, searchQuery, features, onNavSelect, onToggleCollapse, onSearchChange, onConversationSelect, } = props;
    const classes = useChatNavBarStyles();
    const toggleSidebarTooltip = isCollapsed ? 'Expand' : 'Collapse';
    const visibleNavItems = navItems.filter((item) => !item.feature || hasFeature(features, item.feature));
    return (_jsxs("div", { className: mergeClasses(classes.root, isCollapsed && classes.rootCollapsed), children: [_jsxs("div", { className: mergeClasses(classes.topActions, isCollapsed && classes.topActionsCollapsed), children: [!isCollapsed && _jsx(SparkleRegular, { fontSize: 20 }), _jsx("button", { className: classes.iconButton, type: "button", title: toggleSidebarTooltip, "aria-label": toggleSidebarTooltip, onClick: onToggleCollapse, children: _jsx(PanelLeftRegular, { fontSize: 20 }) })] }), _jsx("div", { className: classes.navSection, children: visibleNavItems.map(({ key, label, icon: Icon }) => (_jsxs("button", { className: mergeClasses(classes.navButton, activeNavItem === key && classes.navButtonActive, isCollapsed && classes.navButtonCollapsed), type: "button", title: label, "aria-label": label, onClick: () => onNavSelect(key), children: [_jsx(Icon, { fontSize: 20 }), !isCollapsed && label] }, key))) }), !isCollapsed && (_jsx(ConversationHistoryPage, { conversations: { data: conversations, loading: false }, displayLocation: ConversationHistoryDisplayLocation.Sidebar, searchQuery: searchQuery, onSearchChange: onSearchChange, onSelectConversation: onConversationSelect }))] }));
};
