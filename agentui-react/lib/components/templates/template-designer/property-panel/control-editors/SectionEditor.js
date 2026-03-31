import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input, Switch, Dropdown, Option, SpinButton, } from '@fluentui/react-components';
import { CollapsibleSection, FieldGroup } from '../CollapsibleSection';
import { BindingEditor } from './binding-editor/BindingEditor';
import { StyleEditor } from '../style-editor/StyleEditor';
import { LAYOUT_OPTIONS, FOOTER_ALIGNMENT_OPTIONS } from '../PropertyPanel.models';
export const SectionEditor = ({ section, onUpdateSection, classes, bindingPaths, className, }) => {
    const label = typeof section.label === 'string'
        ? section.label
        : (section.label?.value ?? '');
    return (_jsxs("div", { className: className, children: [_jsxs(CollapsibleSection, { title: "General", classes: classes, children: [_jsx(FieldGroup, { label: "ID", className: classes.field, children: _jsx(Input, { size: "small", value: section.id, readOnly: true }) }), _jsx(FieldGroup, { label: "Label", className: classes.field, children: _jsx(Input, { size: "small", value: label, onChange: (_, d) => onUpdateSection(section.id, { label: d.value }) }) }), _jsx(FieldGroup, { label: "Label Binding", className: classes.field, children: _jsx(BindingEditor, { placeholder: "e.g. section.title", bindingPaths: bindingPaths, value: typeof section.label === 'object'
                                ? (section.label?.binding ?? '')
                                : '', onChange: (v) => onUpdateSection(section.id, {
                                label: v ? { value: label, binding: v } : label,
                            }) }) })] }), _jsxs(CollapsibleSection, { title: "Layout", classes: classes, children: [_jsx(FieldGroup, { label: "Direction", className: classes.field, children: _jsx(Dropdown, { size: "small", value: section.layout ?? 'stack', selectedOptions: [section.layout ?? 'stack'], onOptionSelect: (_, d) => onUpdateSection(section.id, {
                                layout: d.optionValue,
                            }), children: LAYOUT_OPTIONS.map((l) => (_jsx(Option, { value: l, children: l }, l))) }) }), _jsxs("div", { className: classes.row, children: [_jsx(FieldGroup, { label: "Columns", className: classes.halfField, children: _jsx(SpinButton, { size: "small", value: section.columns ?? 1, min: 1, max: 12, onChange: (_, d) => onUpdateSection(section.id, { columns: d.value ?? undefined }) }) }), _jsx(FieldGroup, { label: "Gap", className: classes.halfField, children: _jsx(SpinButton, { size: "small", value: section.gap ?? 0, min: 0, max: 64, onChange: (_, d) => onUpdateSection(section.id, { gap: d.value ?? undefined }) }) })] }), _jsx(FieldGroup, { label: "Height", className: classes.field, children: _jsx(Input, { size: "small", placeholder: "e.g. 300px, 50vh", value: section.height != null ? String(section.height) : '', onChange: (_, d) => onUpdateSection(section.id, { height: d.value || undefined }) }) }), _jsxs("div", { className: classes.row, children: [_jsx(Switch, { label: "Collapsible", checked: section.isCollapsible ?? false, onChange: (_, d) => onUpdateSection(section.id, { isCollapsible: d.checked }) }), _jsx(Switch, { label: "Default Expanded", checked: section.defaultExpanded ?? true, onChange: (_, d) => onUpdateSection(section.id, { defaultExpanded: d.checked }) })] })] }), _jsx(CollapsibleSection, { title: "Footer", classes: classes, children: _jsx(FieldGroup, { label: "Alignment", className: classes.field, children: _jsx(Dropdown, { size: "small", value: section.footerAlignment ?? 'end', selectedOptions: [section.footerAlignment ?? 'end'], onOptionSelect: (_, d) => onUpdateSection(section.id, {
                            footerAlignment: d.optionValue,
                        }), children: FOOTER_ALIGNMENT_OPTIONS.map((a) => (_jsx(Option, { value: a, children: a }, a))) }) }) }), _jsx(StyleEditor, { style: section.style, onChange: (s) => onUpdateSection(section.id, { style: s }), classes: classes })] }));
};
