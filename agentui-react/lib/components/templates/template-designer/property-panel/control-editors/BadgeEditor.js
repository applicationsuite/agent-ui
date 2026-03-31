import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input, Dropdown, Option } from '@fluentui/react-components';
import { CollapsibleSection, FieldGroup } from '../CollapsibleSection';
import { BindingEditor } from './binding-editor/BindingEditor';
import { BADGE_COLORS } from '../PropertyPanel.models';
export const BadgeEditor = ({ control, onUpdate, classes, bindingPaths, }) => (_jsxs(CollapsibleSection, { title: "Badge", classes: classes, children: [_jsx(FieldGroup, { label: "Value", className: classes.field, children: _jsx(Input, { size: "small", value: control.value ?? '', onChange: (_, d) => onUpdate(control.id, { value: d.value }) }) }), _jsx(FieldGroup, { label: "Binding", className: classes.field, children: _jsx(BindingEditor, { placeholder: "e.g. status.label", bindingPaths: bindingPaths, value: control.binding ?? '', onChange: (v) => onUpdate(control.id, {
                    binding: v || undefined,
                }) }) }), _jsx(FieldGroup, { label: "Color", className: classes.field, children: _jsx(Dropdown, { size: "small", value: control.color ?? 'informative', selectedOptions: [control.color ?? 'informative'], onOptionSelect: (_, d) => onUpdate(control.id, {
                    color: d.optionValue,
                }), children: BADGE_COLORS.map((c) => (_jsx(Option, { value: c, children: c }, c))) }) }), _jsx(FieldGroup, { label: "Color Binding", className: classes.field, children: _jsx(BindingEditor, { placeholder: "e.g. status.color", bindingPaths: bindingPaths, value: control.colorBinding ?? '', onChange: (v) => onUpdate(control.id, {
                    colorBinding: v || undefined,
                }) }) })] }));
