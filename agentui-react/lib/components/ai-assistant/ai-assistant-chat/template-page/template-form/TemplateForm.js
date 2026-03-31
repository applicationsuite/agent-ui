import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Dropdown, Input, Option, Skeleton, SkeletonItem, Spinner, } from '@fluentui/react-components';
import { Bot20Regular, DocumentRegular, TextDescription20Regular, } from '@fluentui/react-icons';
import { useCallback, useMemo, useState } from 'react';
import { useTemplateFormStyles } from './TemplateForm.styles';
import { SlidePanel } from '../../../../common/slide-panel';
const createFormState = (template) => template
    ? {
        name: template.name,
        description: template.description ?? '',
        agents: template.agents ?? [],
    }
    : { name: '', description: '', agents: [] };
export const TemplateForm = (props) => {
    const { template, agents, isSidebar = false, isLoading, error, onSave, onClose } = props;
    const classes = useTemplateFormStyles();
    const [form, setForm] = useState(createFormState(template));
    const [formError, setFormError] = useState('');
    const displayError = error || formError;
    const [isSaving, setIsSaving] = useState(false);
    const isDisabled = !!(isSaving || isLoading);
    const selectedAgentsLabel = useMemo(() => form.agents.join(', '), [form.agents]);
    const handleAgentsChange = useCallback((_event, data) => {
        setForm((prev) => ({ ...prev, agents: data.selectedOptions }));
    }, []);
    const handleSave = useCallback(async () => {
        const trimmedName = form.name.trim();
        if (!trimmedName) {
            setFormError('Template name is required.');
            return;
        }
        setFormError('');
        setIsSaving(true);
        try {
            await onSave({
                ...(template ? { id: template.id } : {}),
                name: trimmedName,
                description: form.description.trim() || undefined,
                agents: form.agents,
            });
            onClose();
        }
        catch (error) {
            setFormError(error instanceof Error ? error.message : 'Failed to save template.');
        }
        finally {
            setIsSaving(false);
        }
    }, [form, template, onSave, onClose]);
    /* ── Render helpers ──────────────────────────────────────────────── */
    const renderLoadingSkeleton = () => (_jsx("div", { className: classes.panelShimmerOverlay, children: _jsxs(Skeleton, { animation: "pulse", "aria-label": "Loading template", children: [_jsxs("div", { className: classes.shimmerColumn, children: [_jsx(SkeletonItem, { size: 16, style: { width: '40%' } }), _jsx(SkeletonItem, { size: 32, style: { width: '100%' } })] }), _jsxs("div", { className: classes.shimmerColumn, children: [_jsx(SkeletonItem, { size: 16, style: { width: '35%' } }), _jsx(SkeletonItem, { size: 32, style: { width: '100%' } })] }), _jsxs("div", { className: classes.shimmerColumn, children: [_jsx(SkeletonItem, { size: 16, style: { width: '25%' } }), _jsx(SkeletonItem, { size: 32, style: { width: '100%' } })] })] }) }));
    const renderFormField = (icon, title, description, content) => (_jsxs("div", { className: classes.formField, children: [_jsxs("div", { className: classes.formFieldHeader, children: [_jsx("span", { className: classes.fieldIcon, children: icon }), _jsxs("div", { className: classes.fieldTitleGroup, children: [_jsx("div", { className: classes.fieldTitle, children: title }), _jsx("div", { className: classes.fieldDescription, children: description })] })] }), _jsx("div", { className: classes.formFieldContent, children: content })] }));
    const renderFormFields = () => (_jsxs(_Fragment, { children: [renderFormField(_jsx(TextDescription20Regular, {}), 'Name *', 'A short, descriptive name for this template.', _jsx(Input, { className: classes.fieldInput, placeholder: "e.g. Credit Request List", value: form.name, onChange: (_e, data) => setForm((prev) => ({ ...prev, name: data.value })) })), renderFormField(_jsx(TextDescription20Regular, {}), 'Description', 'Optional summary of what this template renders.', _jsx(Input, { className: classes.fieldInput, placeholder: "e.g. Renders credit requests as a sortable table", value: form.description, onChange: (_e, data) => setForm((prev) => ({ ...prev, description: data.value })) })), renderFormField(_jsx(Bot20Regular, {}), 'Agents', 'Associate this template with one or more agents.', _jsx(Dropdown, { className: classes.fieldInput, placeholder: "Select agents", multiselect: true, value: selectedAgentsLabel, selectedOptions: form.agents, onOptionSelect: handleAgentsChange, children: (agents ?? []).map((agent) => (_jsx(Option, { value: agent.name, children: agent.name }, agent.name))) }))] }));
    /* ── Render ──────────────────────────────────────────────────────── */
    return (_jsxs(SlidePanel, { title: template ? 'Edit Template' : 'New Template', icon: _jsx(DocumentRegular, {}), isSidebar: isSidebar, buttons: {
            submitLabel: template ? 'Save' : 'Create',
            submitDisabled: !form.name.trim(),
            onSubmit: handleSave,
            onCancel: onClose,
        }, disabled: isDisabled, error: displayError || undefined, onClose: onClose, children: [isLoading && renderLoadingSkeleton(), renderFormFields(), isSaving && (_jsx("div", { className: classes.panelBusyOverlay, children: _jsx(Spinner, { label: "Saving template...", size: "small" }) }))] }));
};
