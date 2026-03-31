import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Input, Dropdown, Option, Checkbox, Button, Text, tokens, } from '@fluentui/react-components';
import { AddRegular, DeleteRegular } from '@fluentui/react-icons';
import { CollapsibleSection, FieldGroup } from '../CollapsibleSection';
import { BindingEditor } from './binding-editor/BindingEditor';
import { FORM_INPUT_TYPES } from '../PropertyPanel.models';
export const FormFieldEditor = ({ field, onUpdate, onRenameField, existingNames = [], classes, bindingPaths, }) => {
    const update = (partial) => onUpdate(field.id, partial);
    const hasOptions = field.inputType === 'dropdown' || field.inputType === 'radio';
    // Check for duplicate name (exclude current field's own name)
    const isDuplicateName = existingNames.some((n) => n === field.name && existingNames.indexOf(n) !== existingNames.lastIndexOf(n));
    return (_jsxs(_Fragment, { children: [_jsxs(CollapsibleSection, { title: "Field Properties", classes: classes, children: [_jsxs(FieldGroup, { label: "Name", className: classes.field, children: [_jsx(Input, { size: "small", value: field.name, onChange: (_, d) => {
                                    const newName = d.value;
                                    const conflict = existingNames.some((n) => n === newName && n !== field.name);
                                    if (conflict) {
                                        // Still update locally so user sees what they typed,
                                        // but skip the prompt auto-rename
                                        update({ name: newName });
                                    }
                                    else if (onRenameField) {
                                        onRenameField(field.id, field.name, newName);
                                    }
                                    else {
                                        update({ name: newName });
                                    }
                                } }), isDuplicateName && (_jsxs("span", { style: { color: tokens.colorPaletteRedForeground1, fontSize: tokens.fontSizeBase100 }, children: ["Name \"", field.name, "\" is already used by another field"] }))] }), _jsx(FieldGroup, { label: "Label", className: classes.field, children: _jsx(Input, { size: "small", value: field.label, onChange: (_, d) => update({ label: d.value }) }) }), _jsx(FieldGroup, { label: "Input Type", className: classes.field, children: _jsx(Dropdown, { size: "small", value: field.inputType, selectedOptions: [field.inputType], onOptionSelect: (_, d) => update({ inputType: d.optionValue }), children: FORM_INPUT_TYPES.map((t) => (_jsx(Option, { value: t, children: t }, t))) }) }), _jsx(FieldGroup, { label: "Placeholder", className: classes.field, children: _jsx(Input, { size: "small", value: field.placeholder ?? '', onChange: (_, d) => update({ placeholder: d.value || undefined }) }) }), _jsx(Checkbox, { checked: field.required ?? false, label: "Required", onChange: (_, d) => update({ required: d.checked === true }) }), _jsx(Checkbox, { checked: field.disabled ?? false, label: "Disabled", onChange: (_, d) => update({ disabled: d.checked === true }) })] }), _jsxs(CollapsibleSection, { title: "Default Value", classes: classes, children: [_jsx(FieldGroup, { label: "Static Value", className: classes.field, children: _jsx(Input, { size: "small", value: String(field.defaultValue?.value ?? ''), onChange: (_, d) => update({
                                defaultValue: {
                                    ...field.defaultValue,
                                    value: d.value || undefined,
                                },
                            }) }) }), _jsx(FieldGroup, { label: "Binding", className: classes.field, children: _jsx(BindingEditor, { placeholder: "e.g. order.amount", bindingPaths: bindingPaths, value: field.defaultValue?.binding ?? '', onChange: (v) => update({
                                defaultValue: {
                                    ...field.defaultValue,
                                    binding: v || undefined,
                                },
                            }) }) })] }), field.inputType === 'number' && (_jsx(CollapsibleSection, { title: "Number Settings", classes: classes, children: _jsx(FieldGroup, { label: "Step", className: classes.field, children: _jsx(Input, { size: "small", type: "number", value: String(field.step ?? 1), onChange: (_, d) => update({ step: d.value ? Number(d.value) : undefined }) }) }) })), field.inputType === 'textarea' && (_jsx(CollapsibleSection, { title: "Textarea Settings", classes: classes, children: _jsx(FieldGroup, { label: "Rows", className: classes.field, children: _jsx(Input, { size: "small", type: "number", value: String(field.rows ?? 3), onChange: (_, d) => update({ rows: d.value ? Number(d.value) : undefined }) }) }) })), hasOptions && (_jsx(OptionsEditor, { options: field.options ?? [], onChange: (options) => update({ options }), classes: classes })), _jsxs(CollapsibleSection, { title: "Validation", classes: classes, defaultExpanded: false, children: [_jsx(FieldGroup, { label: "Pattern (regex)", className: classes.field, children: _jsx(Input, { size: "small", value: field.validation?.pattern ?? '', placeholder: "e.g. ^[A-Z]+", onChange: (_, d) => update({
                                validation: {
                                    ...field.validation,
                                    pattern: d.value || undefined,
                                },
                            }) }) }), _jsx(FieldGroup, { label: "Error Message", className: classes.field, children: _jsx(Input, { size: "small", value: field.validation?.message ?? '', placeholder: "Custom error message", onChange: (_, d) => update({
                                validation: {
                                    ...field.validation,
                                    message: d.value || undefined,
                                },
                            }) }) })] })] }));
};
const OptionsEditor = ({ options, onChange, classes, }) => {
    const addOption = () => {
        const index = options.length + 1;
        onChange([
            ...options,
            { label: `Option ${index}`, value: `option${index}` },
        ]);
    };
    const removeOption = (index) => {
        onChange(options.filter((_, i) => i !== index));
    };
    const updateOption = (index, partial) => {
        onChange(options.map((o, i) => (i === index ? { ...o, ...partial } : o)));
    };
    return (_jsxs(CollapsibleSection, { title: "Options", classes: classes, children: [options.map((opt, i) => (_jsxs("div", { className: classes.columnCard, children: [_jsxs("div", { className: classes.columnHeader, children: [_jsxs(Text, { size: 200, weight: "semibold", children: ["Option ", i + 1] }), _jsx(Button, { appearance: "subtle", size: "small", icon: _jsx(DeleteRegular, {}), onClick: () => removeOption(i) })] }), _jsx(FieldGroup, { label: "Label", className: classes.field, children: _jsx(Input, { size: "small", value: opt.label, onChange: (_, d) => updateOption(i, { label: d.value }) }) }), _jsx(FieldGroup, { label: "Value", className: classes.field, children: _jsx(Input, { size: "small", value: opt.value, onChange: (_, d) => updateOption(i, { value: d.value }) }) })] }, i))), _jsx(Button, { className: classes.addColumnBtn, appearance: "subtle", size: "small", icon: _jsx(AddRegular, {}), onClick: addOption, children: "Add Option" })] }));
};
