import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, Input, Skeleton, SkeletonItem, Tooltip, mergeClasses, } from '@fluentui/react-components';
import { Add16Regular, Add24Regular, Delete24Regular, Edit24Regular, Search20Regular, } from '@fluentui/react-icons';
import { useCallback, useMemo } from 'react';
import { useStarterPromptPage } from './StarterPromptPage.hooks';
import { useStarterPromptPageStyles } from './StarterPromptPage.styles';
import { getPromptPreview } from './StarterPromptPage.utils';
import { StarterPromptForm } from './starter-prompt-form/StarterPromptForm';
import { PageLayout } from '../../../common/page-layout';
import { AIAssistantPermission } from '../../AIAssistant.models';
import { checkPermission } from '../../../auth-provider/AuthProvider.utils';
import { useAiAssistantContext } from '../..';
export const StarterPromptPage = (props) => {
    const { agents, isSidebar = false, onClose } = props;
    const { permissions, service } = useAiAssistantContext();
    const classes = useStarterPromptPageStyles();
    const { state, actions } = useStarterPromptPage(props, service);
    const canManage = checkPermission(permissions, AIAssistantPermission.ManageStarterPrompts);
    const { prompts, panelTarget, deleteTarget, deleteError, isDeleting, isSaving, panelError, searchQuery, } = state;
    const allPrompts = useMemo(() => prompts.data ?? [], [prompts.data]);
    const isPanelOpen = panelTarget !== null;
    const editTarget = panelTarget !== null && panelTarget !== undefined ? panelTarget : null;
    const mergedStyles = useMemo(() => {
        const merge = (key) => mergeClasses(classes[key], isSidebar && classes[`${key}Sidebar`]);
        return {
            addButton: merge('addButton'),
            toolbarTopRow: merge('toolbarTopRow'),
            countText: merge('countText'),
            searchInput: merge('searchInput'),
            list: merge('list'),
            promptRow: merge('promptRow'),
            promptTitle: merge('promptTitle'),
            agentBadge: merge('agentBadge'),
            promptText: merge('promptText'),
            rowActions: merge('rowActions'),
            iconButton: merge('iconButton'),
        };
    }, [classes, isSidebar]);
    const availableAgentNames = useMemo(() => {
        const values = new Set();
        agents?.forEach((agent) => {
            const agentName = agent.name.trim();
            if (agentName) {
                values.add(agentName);
            }
        });
        allPrompts.forEach((prompt) => {
            const agentName = prompt.agentName?.trim();
            if (agentName) {
                values.add(agentName);
            }
        });
        return Array.from(values);
    }, [agents, allPrompts]);
    const filteredPrompts = allPrompts.filter((prompt) => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) {
            return true;
        }
        return (prompt.title.toLowerCase().includes(query) ||
            (prompt.prompt ?? '').toLowerCase().includes(query) ||
            (prompt.description ?? '').toLowerCase().includes(query) ||
            (prompt.agentName ?? '').toLowerCase().includes(query) ||
            (prompt.tags ?? []).some((tag) => tag.toLowerCase().includes(query)));
    });
    const isInitialLoading = Boolean(prompts.loading && allPrompts.length === 0);
    const buttonSize = isSidebar ? 'small' : 'medium';
    const openCreatePanel = useCallback(() => {
        actions.openCreatePanel();
    }, [actions]);
    const openEditPanel = useCallback((prompt) => {
        actions.openEditPanel(prompt);
    }, [actions]);
    const handleDelete = useCallback(async () => {
        await actions.confirmDelete();
    }, [actions]);
    const renderHeaderActions = () => {
        if (!canManage)
            return null;
        if (isSidebar) {
            return (_jsx(Button, { appearance: "primary", className: mergedStyles.addButton, size: "small", icon: _jsx(Add16Regular, {}), onClick: openCreatePanel, children: "Add New" }));
        }
        return (_jsx(Button, { appearance: "primary", className: mergedStyles.addButton, size: "medium", icon: _jsx(Add24Regular, { fontSize: 20 }), disabled: isInitialLoading, onClick: openCreatePanel, children: "Add New" }));
    };
    const renderToolbar = () => (_jsxs(_Fragment, { children: [isSidebar ? (_jsxs("div", { className: mergedStyles.toolbarTopRow, children: [allPrompts.length > 0 && (_jsx(Input, { className: mergedStyles.searchInput, size: "small", contentBefore: _jsx(Search20Regular, { fontSize: 16 }), input: { className: classes.searchInputField }, placeholder: "Search", value: searchQuery, onChange: (_, data) => actions.setSearchQuery(data.value) })), _jsxs("span", { className: mergedStyles.countText, children: [filteredPrompts.length, " starter prompt", filteredPrompts.length === 1 ? '' : 's'] })] })) : (allPrompts.length > 0 && (_jsx(Input, { className: mergedStyles.searchInput, size: "medium", contentBefore: _jsx(Search20Regular, { fontSize: 20 }), input: { className: classes.searchInputField }, placeholder: "Search starter prompts", value: searchQuery, onChange: (_, data) => actions.setSearchQuery(data.value) }))), !isSidebar && (_jsxs("span", { className: mergedStyles.countText, children: [filteredPrompts.length, " starter prompt", filteredPrompts.length === 1 ? '' : 's'] }))] }));
    const renderPromptRow = (prompt) => {
        const editButton = canManage ? (_jsx(Button, { appearance: "subtle", className: mergedStyles.iconButton, size: buttonSize, icon: _jsx(Edit24Regular, {}), "aria-label": `Edit ${prompt.title}`, onClick: () => openEditPanel(prompt) })) : null;
        const deleteButton = canManage ? (_jsx(Button, { appearance: "subtle", className: mergedStyles.iconButton, size: buttonSize, icon: _jsx(Delete24Regular, {}), "aria-label": `Delete ${prompt.title}`, disabled: !prompt.id, onClick: () => actions.openDeleteDialog(prompt) })) : null;
        return (_jsxs("div", { className: mergedStyles.promptRow, children: [_jsxs("div", { className: classes.promptContent, children: [_jsxs("div", { className: classes.promptTitleRow, children: [_jsx("div", { className: mergedStyles.promptTitle, children: prompt.title }), prompt.agentName && (_jsx("span", { className: mergedStyles.agentBadge, children: prompt.agentName }))] }), _jsx("div", { className: mergedStyles.promptText, children: getPromptPreview(prompt.prompt ?? '', prompt.description) })] }), _jsx("div", { className: mergedStyles.rowActions, children: isSidebar ? (_jsxs(_Fragment, { children: [_jsx(Tooltip, { content: "Edit", relationship: "label", children: _jsx("span", { className: classes.rowActionTooltipTarget, children: editButton }) }), _jsx(Tooltip, { content: "Delete", relationship: "label", children: _jsx("span", { className: classes.rowActionTooltipTarget, children: deleteButton }) })] })) : (_jsxs(_Fragment, { children: [editButton, deleteButton] })) })] }, prompt.id ?? `${prompt.agentName}_${prompt.title}`));
    };
    const renderLoadingSkeleton = () => (_jsx("div", { className: mergedStyles.list, children: _jsx(Skeleton, { animation: "pulse", "aria-label": "Loading starter prompts", children: Array.from({ length: 4 }, (_, i) => (_jsxs("div", { className: mergedStyles.promptRow, children: [_jsxs("div", { className: classes.shimmerColumn, children: [_jsxs("div", { className: classes.shimmerRow, children: [_jsx(SkeletonItem, { size: 16, style: { width: '30%' } }), _jsx(SkeletonItem, { size: 16, style: { width: '12%' } })] }), _jsx(SkeletonItem, { size: 12, style: { width: '70%' } })] }), _jsxs("div", { className: classes.shimmerRow, children: [_jsx(SkeletonItem, { shape: "circle", size: 28 }), _jsx(SkeletonItem, { shape: "circle", size: 28 })] })] }, i))) }) }));
    const renderErrorState = () => (_jsxs("div", { className: classes.emptyState, children: [_jsx("div", { className: classes.emptyTitle, children: "Failed to load starter prompts" }), _jsx("div", { className: classes.emptyDescription, children: prompts.error ?? 'Something went wrong. Please try again.' }), _jsx(Button, { appearance: "primary", className: classes.emptyAction, onClick: () => actions.initialize(), children: "Retry" })] }));
    const renderContent = () => {
        if (isInitialLoading)
            return renderLoadingSkeleton();
        if (prompts.error && allPrompts.length === 0)
            return renderErrorState();
        if (allPrompts.length === 0) {
            return (_jsxs("div", { className: classes.emptyState, children: [_jsx("div", { className: classes.emptyIcon, children: _jsx(Add24Regular, {}) }), _jsx("div", { className: classes.emptyTitle, children: "No starter prompts yet" }), _jsx("div", { className: classes.emptyDescription, children: "Create your first starter prompt to help users begin common tasks faster." }), canManage && (_jsx(Button, { appearance: "primary", className: classes.emptyAction, onClick: openCreatePanel, children: "Create Starter Prompt" }))] }));
        }
        if (filteredPrompts.length === 0) {
            return (_jsxs("div", { className: classes.emptyState, children: [_jsx("div", { className: classes.emptyTitle, children: "No prompts match your search" }), _jsx("div", { className: classes.emptyDescription, children: "Try a different keyword or clear the current filter." })] }));
        }
        return (_jsx("div", { className: mergedStyles.list, children: filteredPrompts.map(renderPromptRow) }));
    };
    const renderDeleteDialog = () => (_jsx(Dialog, { open: Boolean(deleteTarget), onOpenChange: (_, data) => {
            if (!data.open && !isDeleting) {
                actions.closeDeleteDialog();
            }
        }, children: _jsx(DialogSurface, { children: _jsxs(DialogBody, { children: [_jsx(DialogTitle, { children: "Delete starter prompt" }), _jsxs(DialogContent, { className: classes.dialogContent, children: [_jsx("div", { children: deleteTarget
                                    ? `Delete "${deleteTarget.title}" for ${deleteTarget.agentName ?? 'this agent'}?`
                                    : 'Delete this starter prompt?' }), deleteError && (_jsx("div", { className: classes.errorBanner, children: deleteError }))] }), _jsxs(DialogActions, { children: [_jsx(Button, { appearance: "secondary", disabled: isDeleting, onClick: () => actions.closeDeleteDialog(), children: "Cancel" }), _jsx(Button, { appearance: "primary", disabled: isDeleting, onClick: handleDelete, children: isDeleting ? 'Deleting...' : 'Delete' })] })] }) }) }));
    return (_jsxs(PageLayout, { title: "Starter Prompts", isSidebar: isSidebar, headerActions: renderHeaderActions(), toolbar: renderToolbar(), onClose: onClose, children: [renderContent(), isPanelOpen && (_jsx(StarterPromptForm, { prompt: editTarget, isSidebar: isSidebar, agents: availableAgentNames, loading: isSaving, panelError: panelError, onSave: actions.savePrompt, onClose: actions.closePanel })), renderDeleteDialog()] }));
};
