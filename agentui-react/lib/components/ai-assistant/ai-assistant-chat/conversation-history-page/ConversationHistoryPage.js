import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Input, mergeClasses } from '@fluentui/react-components';
import { useMemo, useState } from 'react';
import { Add16Regular, Add24Regular, Search20Regular, } from '@fluentui/react-icons';
import { ConversationHistoryDisplayLocation, } from './ConversationHistoryPage.models';
import { useConversationHistoryPageStyles } from './ConversationHistoryPage.styles';
import { getTimeAgo } from '../AIAssistantChat.utils';
import { PageLayout } from '../../../common/page-layout';
export const ConversationHistoryPage = (props) => {
    const { conversations, displayLocation, onClose, onNewChat, searchQuery, onSearchChange, onSelectConversation, } = props;
    const classes = useConversationHistoryPageStyles();
    const [internalSearchQuery, setInternalSearchQuery] = useState('');
    const isSidebar = displayLocation === ConversationHistoryDisplayLocation.Sidebar;
    const effectiveSearchQuery = searchQuery ?? internalSearchQuery;
    const allConversations = conversations?.data ?? [];
    const filtered = allConversations.filter((c) => c.firstMessageText
        .toLowerCase()
        .includes(effectiveSearchQuery.toLowerCase()));
    const mergedStyles = useMemo(() => {
        const merge = (key) => mergeClasses(classes[key], isSidebar && classes[`${key}Sidebar`]);
        return {
            newChatButton: merge('newChatButton'),
            searchInput: merge('searchInput'),
            countText: merge('countText'),
            list: merge('list'),
            card: merge('card'),
            cardTitle: merge('cardTitle'),
            cardTime: merge('cardTime'),
            cardDescription: merge('cardDescription'),
        };
    }, [classes, isSidebar]);
    const handleSearchValueChange = (value) => {
        if (onSearchChange) {
            onSearchChange(value);
            return;
        }
        setInternalSearchQuery(value);
    };
    /* ── Render helpers ──────────────────────────────────────────────── */
    const renderConversationRow = (conversation) => (_jsx("button", { className: mergedStyles.card, type: "button", onClick: () => onSelectConversation(conversation), children: _jsxs("div", { className: classes.cardContent, children: [_jsxs("div", { className: classes.cardTitleRow, children: [_jsx("span", { className: mergedStyles.cardTitle, children: conversation.firstMessageText }), _jsx("span", { className: mergedStyles.cardTime, children: getTimeAgo(conversation.lastActivityAt) })] }), !isSidebar && (_jsxs("div", { className: mergedStyles.cardDescription, children: ["Last message ", getTimeAgo(conversation.lastActivityAt)] }))] }) }, conversation.id));
    const renderHeaderActions = () => onNewChat ? (_jsx(Button, { appearance: "primary", className: mergedStyles.newChatButton, size: isSidebar ? 'small' : 'medium', icon: isSidebar ? _jsx(Add16Regular, {}) : _jsx(Add24Regular, { fontSize: 20 }), onClick: onNewChat, children: "New Chat" })) : null;
    const renderToolbarContent = () => (_jsxs(_Fragment, { children: [allConversations.length > 0 && (_jsx(Input, { className: mergedStyles.searchInput, size: isSidebar ? 'small' : 'medium', contentBefore: _jsx(Search20Regular, { fontSize: isSidebar ? 16 : 20 }), input: { className: classes.searchInputField }, placeholder: isSidebar ? 'Search' : 'Search conversations', value: effectiveSearchQuery, onChange: (_, data) => handleSearchValueChange(data.value) })), _jsxs("span", { className: mergedStyles.countText, children: [filtered.length, " conversation", filtered.length === 1 ? '' : 's'] })] }));
    /* ── Render ──────────────────────────────────────────────────────── */
    return (_jsx(PageLayout, { title: "Chats", isSidebar: isSidebar, headerActions: renderHeaderActions(), toolbar: renderToolbarContent(), onClose: onClose, children: _jsx("div", { className: mergedStyles.list, children: filtered.map(renderConversationRow) }) }));
};
