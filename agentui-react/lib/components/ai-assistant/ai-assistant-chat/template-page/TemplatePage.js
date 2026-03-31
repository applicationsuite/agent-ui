import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Button, Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, Input, Skeleton, SkeletonItem, Tooltip, mergeClasses, } from '@fluentui/react-components';
import { Add16Regular, Add24Regular, Delete24Regular, PaintBrush24Regular, Edit24Regular, Search20Regular, } from '@fluentui/react-icons';
import { useMemo } from 'react';
import { useTemplatePageStyles } from './TemplatePage.styles';
import { useTemplatePage } from './TemplatePage.hooks';
import { TemplateForm } from './template-form/TemplateForm';
import { TemplateDesign } from './template-design/TemplateDesign';
import { PageLayout } from '../../../common/page-layout';
import { AIAssistantPermission } from '../../AIAssistant.models';
import { checkPermission } from '../../../auth-provider/AuthProvider.utils';
import { useAiAssistantContext } from '../../AiAssistant.context';
export const TemplatePage = (props) => {
    const { agents, isSidebar = false, onClose } = props;
    const { permissions, service } = useAiAssistantContext();
    const { state, actions } = useTemplatePage(props, service);
    const canManage = checkPermission(permissions, AIAssistantPermission.ManageTemplates);
    const { templates, formPanelTarget, designPanelTarget, deleteTarget, deleteError, isDeleting, isPanelLoading, panelError, searchQuery, } = state;
    const classes = useTemplatePageStyles();
    const allTemplates = useMemo(() => templates.data ?? [], [templates.data]);
    const mergedStyles = useMemo(() => {
        const merge = (key) => mergeClasses(classes[key], isSidebar && classes[`${key}Sidebar`]);
        return {
            addButton: merge('addButton'),
            toolbarTopRow: merge('toolbarTopRow'),
            countText: merge('countText'),
            searchInput: merge('searchInput'),
            list: merge('list'),
            templateRow: merge('templateRow'),
            templateTitle: merge('templateTitle'),
            agentBadge: merge('agentBadge'),
            templateDescription: merge('templateDescription'),
            rowActions: merge('rowActions'),
            iconButton: merge('iconButton'),
        };
    }, [classes, isSidebar]);
    const filteredTemplates = useMemo(() => {
        if (!searchQuery.trim())
            return allTemplates;
        const lower = searchQuery.toLowerCase();
        return allTemplates.filter((t) => t.name.toLowerCase().includes(lower) ||
            (t.description?.toLowerCase().includes(lower) ?? false) ||
            t.agents.some((a) => a.toLowerCase().includes(lower)));
    }, [allTemplates, searchQuery]);
    const isInitialLoading = !!(templates.loading && !allTemplates.length);
    const hasTemplates = allTemplates.length > 0;
    const buttonSize = isSidebar ? 'small' : 'medium';
    /* ── Render helpers ──────────────────────────────────────────────── */
    const renderHeaderActions = () => {
        if (!canManage)
            return null;
        if (isSidebar) {
            return (_jsx(Button, { appearance: "primary", className: mergedStyles.addButton, size: "small", icon: _jsx(Add16Regular, {}), onClick: () => actions.openFormPanel(null), children: "Add New" }));
        }
        return (_jsx(Button, { appearance: "primary", className: mergedStyles.addButton, size: "medium", icon: _jsx(Add24Regular, { fontSize: 20 }), onClick: () => actions.openFormPanel(null), disabled: isInitialLoading, children: "Add New" }));
    };
    const renderSidebarToolbar = () => (_jsxs("div", { className: mergedStyles.toolbarTopRow, children: [hasTemplates && (_jsx(Input, { className: mergedStyles.searchInput, size: "small", contentBefore: _jsx(Search20Regular, { fontSize: 16 }), input: { className: classes.searchInputField }, placeholder: "Search", value: searchQuery, onChange: (_, data) => actions.setSearchQuery(data.value) })), _jsxs("span", { className: mergedStyles.countText, children: [filteredTemplates.length, " template", filteredTemplates.length === 1 ? '' : 's'] })] }));
    const renderDesktopToolbar = () => (_jsxs(_Fragment, { children: [hasTemplates && (_jsx(Input, { className: mergedStyles.searchInput, size: "medium", contentBefore: _jsx(Search20Regular, { fontSize: 20 }), input: { className: classes.searchInputField }, placeholder: "Search templates", value: searchQuery, onChange: (_, data) => actions.setSearchQuery(data.value) })), _jsxs("span", { className: mergedStyles.countText, children: [filteredTemplates.length, " template", filteredTemplates.length === 1 ? '' : 's'] })] }));
    const renderLoadingSkeleton = () => (_jsx("div", { className: mergedStyles.list, children: _jsx(Skeleton, { animation: "pulse", "aria-label": "Loading templates", children: Array.from({ length: 4 }, (_, i) => (_jsxs("div", { className: mergedStyles.templateRow, children: [_jsxs("div", { className: classes.shimmerColumn, children: [_jsxs("div", { className: classes.shimmerRow, children: [_jsx(SkeletonItem, { size: 16, style: { width: '30%' } }), _jsx(SkeletonItem, { size: 16, style: { width: '12%' } })] }), _jsx(SkeletonItem, { size: 12, style: { width: '70%' } })] }), _jsxs("div", { className: classes.shimmerRow, children: [_jsx(SkeletonItem, { shape: "circle", size: 28 }), _jsx(SkeletonItem, { shape: "circle", size: 28 }), _jsx(SkeletonItem, { shape: "circle", size: 28 })] })] }, i))) }) }));
    const renderEmptyState = () => (_jsxs("div", { className: classes.emptyState, children: [_jsx("div", { className: classes.emptyIcon, children: _jsx(Add24Regular, {}) }), _jsx("div", { className: classes.emptyTitle, children: "No templates yet" }), _jsx("div", { className: classes.emptyDescription, children: "Create your first template to help render structured data in the assistant." }), canManage && (_jsx(Button, { appearance: "primary", className: classes.emptyAction, onClick: () => actions.openFormPanel(null), children: "Create Template" }))] }));
    const renderNoMatchState = () => (_jsxs("div", { className: classes.emptyState, children: [_jsx("div", { className: classes.emptyTitle, children: "No templates match your search" }), _jsx("div", { className: classes.emptyDescription, children: "Try a different keyword or clear the current filter." })] }));
    const renderErrorState = () => (_jsxs("div", { className: classes.emptyState, children: [_jsx("div", { className: classes.emptyTitle, children: "Failed to load templates" }), _jsx("div", { className: classes.emptyDescription, children: templates.error ?? 'Something went wrong. Please try again.' }), _jsx(Button, { appearance: "primary", className: classes.emptyAction, onClick: () => actions.initialize(), children: "Retry" })] }));
    const renderTemplateRow = (template) => (_jsxs("div", { className: mergedStyles.templateRow, children: [_jsxs("div", { className: classes.templateContent, children: [_jsxs("div", { className: classes.templateTitleRow, children: [_jsx("span", { className: mergedStyles.templateTitle, children: template.name }), template.agents.map((agent) => (_jsx("span", { className: mergedStyles.agentBadge, children: agent }, agent)))] }), template.description && (_jsx("div", { className: mergedStyles.templateDescription, children: template.description }))] }), _jsxs("div", { className: mergedStyles.rowActions, children: [_jsx(Tooltip, { content: "Design", relationship: "label", children: _jsx("span", { className: classes.rowActionTooltipTarget, children: _jsx(Button, { className: mergedStyles.iconButton, appearance: "subtle", size: buttonSize, icon: _jsx(PaintBrush24Regular, {}), onClick: () => actions.openDesignPanel(template) }) }) }), canManage && (_jsx(Tooltip, { content: "Edit", relationship: "label", children: _jsx("span", { className: classes.rowActionTooltipTarget, children: _jsx(Button, { className: mergedStyles.iconButton, appearance: "subtle", size: buttonSize, icon: _jsx(Edit24Regular, {}), onClick: () => actions.openFormPanel(template) }) }) })), canManage && (_jsx(Tooltip, { content: "Delete", relationship: "label", children: _jsx("span", { className: classes.rowActionTooltipTarget, children: _jsx(Button, { className: mergedStyles.iconButton, appearance: "subtle", size: buttonSize, icon: _jsx(Delete24Regular, {}), onClick: () => actions.openDeleteDialog(template) }) }) }))] })] }, template.id ?? template.name));
    const renderContent = () => {
        if (isInitialLoading)
            return renderLoadingSkeleton();
        if (templates.error && allTemplates.length === 0)
            return renderErrorState();
        if (allTemplates.length === 0)
            return renderEmptyState();
        if (filteredTemplates.length === 0)
            return renderNoMatchState();
        return (_jsx("div", { className: mergedStyles.list, children: filteredTemplates.map(renderTemplateRow) }));
    };
    /* ── Render ──────────────────────────────────────────────────────── */
    return (_jsxs(PageLayout, { title: "Templates", isSidebar: isSidebar, headerActions: renderHeaderActions(), toolbar: isSidebar ? renderSidebarToolbar() : renderDesktopToolbar(), onClose: onClose, children: [renderContent(), formPanelTarget !== undefined && (_jsx(TemplateForm, { template: formPanelTarget, agents: agents, isSidebar: isSidebar, isLoading: isPanelLoading, error: panelError, onSave: actions.saveTemplate, onClose: actions.closeFormPanel })), designPanelTarget && (_jsx(TemplateDesign, { template: designPanelTarget, isLoading: isPanelLoading, isReadOnly: !canManage, error: panelError, onSave: actions.saveTemplate, onClose: actions.closeDesignPanel })), _jsx(Dialog, { open: deleteTarget !== null, onOpenChange: (_e, data) => {
                    if (!data.open)
                        actions.closeDeleteDialog();
                }, children: _jsx(DialogSurface, { children: _jsxs(DialogBody, { children: [_jsx(DialogTitle, { children: "Delete Template" }), _jsxs(DialogContent, { className: classes.dialogContent, children: [_jsxs("p", { children: ["Are you sure you want to delete", ' ', _jsx("strong", { children: deleteTarget?.name }), "? This action cannot be undone."] }), deleteError && (_jsx("div", { className: classes.errorBanner, children: deleteError }))] }), _jsxs(DialogActions, { children: [_jsx(Button, { appearance: "secondary", disabled: isDeleting, onClick: actions.closeDeleteDialog, children: "Cancel" }), _jsx(Button, { appearance: "primary", disabled: isDeleting, onClick: actions.confirmDelete, children: isDeleting ? 'Deleting...' : 'Delete' })] })] }) }) })] }));
};
