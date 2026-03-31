import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useCallback, useRef, useState } from 'react';
import { TemplateDesignerMode, } from './TemplateDesigner.models';
import { useInit } from './TemplateDesigner.hooks';
import { useTemplateDesignerStyles } from './TemplateDesigner.styles';
import { Button, Dialog, DialogBody, DialogContent, DialogSurface, DialogTitle, DialogTrigger, Text, ToggleButton, Tooltip, } from '@fluentui/react-components';
import { EditRegular, EyeRegular, CodeRegular, SaveRegular, DismissRegular, DesignIdeasRegular, PanelRightRegular, ChevronLeftRegular, ArrowUploadRegular, CheckmarkCircleRegular, ArrowUndoRegular, CopyRegular, CheckmarkRegular, } from '@fluentui/react-icons';
import { TemplateRenderer } from '../template-renderer/TemplateRenderer';
import { TemplateTreeView } from './template-treeview/TemplateTreeView';
import { PropertyPanel } from './property-panel/PropertyPanel';
import { extractBindingPaths, validateTemplateJson, } from './TemplateDesigner.utils';
const MODE_OPTIONS = [
    { key: TemplateDesignerMode.Design, label: 'Design', icon: _jsx(EditRegular, {}) },
    { key: TemplateDesignerMode.Preview, label: 'Preview', icon: _jsx(EyeRegular, {}) },
    { key: TemplateDesignerMode.JSON, label: 'JSON', icon: _jsx(CodeRegular, {}) },
];
const getSelectedBadge = (selected, template) => {
    if (!selected)
        return null;
    if (selected.type === 'card')
        return 'Card';
    if (selected.type === 'section')
        return 'Section';
    if (selected.type === 'control' && template) {
        const findCtrl = (sections) => {
            for (const s of sections ?? []) {
                const c = s.children?.find((ch) => ch.id === selected.id);
                if (c)
                    return c.type.charAt(0).toUpperCase() + c.type.slice(1);
                const sub = findCtrl(s.subsections);
                if (sub)
                    return sub;
            }
            return null;
        };
        const cardChild = template.card.children?.find((c) => c.id === selected.id);
        if (cardChild)
            return cardChild.type.charAt(0).toUpperCase() + cardChild.type.slice(1);
        return findCtrl(template.card.sections);
    }
    return null;
};
const onAction = (action, payload) => {
    console.log('Action triggered:', action, payload);
};
export const TemplateDesigner = (props) => {
    const classes = useTemplateDesignerStyles();
    const { state, actions } = useInit(props);
    const isReadOnly = props.isReadOnly ?? false;
    const [showProperties, setShowProperties] = useState(true);
    const [jsonUploadError, setJsonUploadError] = useState(null);
    const [showBindingPreview, setShowBindingPreview] = useState(false);
    const [jsonCopied, setJsonCopied] = useState(false);
    const fileInputRef = useRef(null);
    const templateJsonInputRef = useRef(null);
    const handleFileChange = useCallback((e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const json = JSON.parse(reader.result);
                const paths = extractBindingPaths(json);
                actions.setBindingPaths(paths);
                actions.setBindingData(json);
            }
            catch {
                // invalid JSON — ignore
            }
        };
        reader.readAsText(file);
        // Reset so the same file can be re-uploaded
        e.target.value = '';
    }, [actions]);
    const handleTemplateJsonFileChange = useCallback((e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        const reader = new FileReader();
        reader.onload = () => {
            try {
                const parsed = JSON.parse(reader.result);
                const error = validateTemplateJson(parsed);
                if (error) {
                    setJsonUploadError(error);
                }
                else {
                    setJsonUploadError(null);
                    actions.updateTemplate(parsed);
                }
            }
            catch {
                setJsonUploadError('Invalid JSON: file could not be parsed.');
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    }, [actions]);
    const handleCopyJson = useCallback((t) => {
        const json = JSON.stringify(t, null, 2);
        navigator.clipboard.writeText(json).then(() => {
            setJsonCopied(true);
            setTimeout(() => setJsonCopied(false), 2000);
        });
    }, []);
    if (state.template.loading) {
        return (_jsx("div", { className: classes.emptyState, children: _jsx(Text, { children: "Loading template..." }) }));
    }
    if (state.template.error) {
        return (_jsxs("div", { className: classes.emptyState, children: [_jsx(Text, { weight: "semibold", children: "Unable to load template" }), _jsx(Text, { size: 200, children: state.template.error })] }));
    }
    const template = state.template.data;
    const selectedBadge = getSelectedBadge(state.selectedElement, template);
    const renderToolbar = () => (_jsxs("div", { className: classes.toolbar, children: [_jsxs("div", { className: classes.toolbarTitle, children: [_jsx(DesignIdeasRegular, { fontSize: 20 }), _jsx(Text, { weight: "semibold", size: 400, children: template?.name ?? 'Template Designer' }), state.isDirty && (_jsx(Text, { size: 200, italic: true, style: { opacity: 0.6 }, children: "(unsaved changes)" }))] }), _jsxs("div", { className: classes.toolbarActions, children: [!isReadOnly && (_jsx(_Fragment, { children: _jsx("div", { className: classes.modeGroup, children: MODE_OPTIONS.map(({ key, label, icon }) => (_jsx(Tooltip, { content: label, relationship: "label", children: _jsx(ToggleButton, { appearance: "subtle", size: "small", icon: icon, checked: state.mode === key, onClick: () => actions.setMode(key), children: label }) }, key))) }) })), !isReadOnly && (_jsxs(_Fragment, { children: [_jsx("div", { className: classes.dividerVertical }), state.bindingPaths.length > 0 ? (_jsxs("div", { className: classes.bindingGroup, children: [_jsx(Tooltip, { content: `Data source loaded (${state.bindingPaths.length} paths)`, relationship: "label", children: _jsxs(Button, { appearance: "subtle", size: "small", icon: _jsx(CheckmarkCircleRegular, { className: classes.bindingLoadedIcon }), className: classes.bindingLoadedBtn, onClick: () => setShowBindingPreview(true), children: ["Data Source (", state.bindingPaths.length, ")"] }) }), _jsx("div", { className: classes.bindingGroupDivider }), _jsx(Tooltip, { content: "Re-upload data source", relationship: "label", children: _jsx(Button, { appearance: "subtle", size: "small", icon: _jsx(ArrowUploadRegular, {}), className: classes.bindingReuploadBtn, onClick: () => fileInputRef.current?.click() }) })] })) : (_jsx(Tooltip, { content: "Upload data source JSON", relationship: "label", children: _jsx(Button, { appearance: "subtle", size: "small", icon: _jsx(ArrowUploadRegular, {}), onClick: () => fileInputRef.current?.click(), children: "Data Source" }) })), _jsx("input", { ref: fileInputRef, type: "file", accept: ".json", className: classes.hiddenInput, "aria-label": "Upload data source JSON file", onChange: handleFileChange }), _jsx(Tooltip, { content: "Revert to last saved", relationship: "label", children: _jsx(Button, { appearance: "subtle", size: "small", icon: _jsx(ArrowUndoRegular, {}), onClick: actions.revert, disabled: !state.isDirty, children: "Revert" }) }), _jsx(Tooltip, { content: "Save template", relationship: "label", children: _jsx(Button, { appearance: "primary", size: "small", icon: _jsx(SaveRegular, {}), onClick: actions.save, disabled: !state.isDirty, children: "Save" }) }), props.onClose && (_jsx(Tooltip, { content: "Close designer", relationship: "label", children: _jsx(Button, { appearance: "subtle", size: "small", icon: _jsx(DismissRegular, {}), onClick: props.onClose, children: "Close" }) }))] }))] })] }));
    const renderPropertyPanel = () => showProperties && state.selectedElement ? (_jsxs("div", { className: classes.propertyPanel, children: [_jsxs("div", { className: classes.propertyPanelHeader, children: [_jsxs("div", { className: classes.propertyPanelHeaderLeft, children: [_jsx(Text, { weight: "semibold", size: 200, className: classes.propertyPanelHeaderLabel, children: "Properties" }), selectedBadge && (_jsx("span", { className: classes.propertyPanelHeaderBadge, children: selectedBadge }))] }), _jsx(Tooltip, { content: "Hide properties", relationship: "label", children: _jsx(Button, { appearance: "subtle", size: "small", icon: _jsx(ChevronLeftRegular, { style: { transform: 'rotate(180deg)' } }), onClick: () => setShowProperties(false) }) })] }), _jsx("div", { className: classes.propertyPanelBody, children: _jsx(PropertyPanel, { template: template, selectedElement: state.selectedElement, onTemplateChange: actions.updateTemplate, onSelectElement: actions.selectElement, bindingPaths: state.bindingPaths, bindingData: state.bindingData }) })] })) : (_jsxs("div", { className: classes.propertyPanelCollapsed, onClick: () => setShowProperties(true), role: "button", tabIndex: 0, onKeyDown: (e) => {
            if (e.key === 'Enter')
                setShowProperties(true);
        }, children: [_jsx(PanelRightRegular, { fontSize: 16 }), _jsx(Text, { size: 200, weight: "semibold", className: classes.collapsedLabel, children: "Properties" })] }));
    const renderDesignMode = (t) => (_jsxs("div", { className: classes.editorLayout, children: [_jsx("div", { className: classes.treePanel, children: _jsx(TemplateTreeView, { template: t, selectedElement: state.selectedElement, onSelectElement: actions.selectElement, onAddSection: actions.addSection, onRemoveSection: actions.removeSection, onAddControl: actions.addControl, onRemoveControl: actions.removeControl, onAddControlToCard: actions.addControlToCard, onRemoveControlFromCard: actions.removeControlFromCard, onMoveNode: actions.moveNode }) }), _jsxs("div", { className: classes.previewPanel, children: [_jsx("div", { className: classes.previewPanelHeader, children: _jsx(Text, { weight: "semibold", size: 200, className: classes.previewPanelHeaderLabel, children: "Preview" }) }), _jsx("div", { className: classes.previewPanelBody, children: _jsx("div", { className: classes.previewCard, children: _jsx(TemplateRenderer, { data: { template: t, serverData: state.bindingData }, onAction: onAction }) }) })] }), renderPropertyPanel()] }));
    const renderPreviewMode = (t) => (_jsx("div", { className: classes.fullPreview, children: _jsx("div", { className: classes.fullPreviewCard, children: _jsx(TemplateRenderer, { data: { template: t, serverData: state.bindingData }, onAction: onAction }) }) }));
    const renderJsonMode = (t) => (_jsx("div", { className: classes.jsonView, children: _jsxs("div", { className: classes.jsonContainer, children: [_jsxs("div", { className: classes.jsonToolbar, children: [_jsx(Tooltip, { content: "Upload template JSON", relationship: "label", children: _jsx(Button, { appearance: "outline", size: "small", icon: _jsx(ArrowUploadRegular, {}), onClick: () => templateJsonInputRef.current?.click(), children: "Import Template JSON" }) }), _jsx(Tooltip, { content: "Copy JSON to clipboard", relationship: "label", children: _jsx(Button, { appearance: "outline", size: "small", icon: jsonCopied ? _jsx(CheckmarkRegular, {}) : _jsx(CopyRegular, {}), onClick: () => handleCopyJson(t), children: jsonCopied ? 'Copied!' : 'Copy JSON' }) }), _jsx("input", { ref: templateJsonInputRef, type: "file", accept: ".json", className: classes.hiddenInput, "aria-label": "Upload template JSON file", onChange: handleTemplateJsonFileChange })] }), jsonUploadError && (_jsxs("div", { className: classes.jsonError, children: [_jsx(Text, { size: 200, weight: "semibold", children: "Import failed:" }), _jsx(Text, { size: 200, children: jsonUploadError })] })), _jsx("pre", { className: classes.jsonPre, children: JSON.stringify(t, null, 2) })] }) }));
    const renderBindingPreviewDialog = () => (_jsx(Dialog, { open: showBindingPreview, onOpenChange: (_e, data) => setShowBindingPreview(data.open), children: _jsx(DialogSurface, { className: classes.bindingDialogSurface, children: _jsxs(DialogBody, { children: [_jsxs(DialogTitle, { action: _jsx(DialogTrigger, { action: "close", children: _jsx(Button, { appearance: "subtle", size: "small", icon: _jsx(DismissRegular, {}), "aria-label": "Close" }) }), children: ["Data Source (", state.bindingPaths.length, " paths)"] }), _jsx(DialogContent, { children: _jsx("pre", { className: classes.bindingPreviewPre, children: JSON.stringify(state.bindingData, null, 2) }) })] }) }) }));
    return (_jsxs("div", { className: classes.root, children: [renderToolbar(), _jsxs("div", { className: classes.content, children: [!isReadOnly && state.mode === TemplateDesignerMode.Design &&
                        template &&
                        renderDesignMode(template), state.mode === TemplateDesignerMode.Preview &&
                        template &&
                        renderPreviewMode(template), !isReadOnly && state.mode === TemplateDesignerMode.JSON &&
                        template &&
                        renderJsonMode(template)] }), renderBindingPreviewDialog()] }));
};
