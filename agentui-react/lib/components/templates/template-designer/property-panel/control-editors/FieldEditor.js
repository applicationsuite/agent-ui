import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input, Dropdown, Option } from '@fluentui/react-components';
import { CollapsibleSection, FieldGroup } from '../CollapsibleSection';
import { BindingEditor } from './binding-editor/BindingEditor';
import { FIELD_FORMATS } from '../PropertyPanel.models';
import { toPrettyFieldLabel } from '../../TemplateDesigner.utils';
export const FieldEditor = ({ control, onUpdate, classes, bindingPaths, }) => {
    return (_jsxs(CollapsibleSection, { title: "Data", classes: classes, children: [_jsx(FieldGroup, { label: "Value", className: classes.field, children: _jsx(Input, { size: "small", value: String(control.value ?? ''), onChange: (_, d) => onUpdate(control.id, { value: d.value }) }) }), _jsx(FieldGroup, { label: "Binding", className: classes.field, children: _jsx(BindingEditor, { placeholder: "e.g. customer.name", bindingPaths: bindingPaths, value: control.binding ?? '', onChange: (v) => {
                        const nextBinding = v || undefined;
                        const currentAutoLabel = toPrettyFieldLabel(control.binding);
                        const shouldAutoUpdateLabel = !control.label ||
                            control.label === 'New Field' ||
                            control.label === currentAutoLabel;
                        const nextLabel = shouldAutoUpdateLabel && nextBinding
                            ? toPrettyFieldLabel(nextBinding)
                            : control.label;
                        onUpdate(control.id, {
                            binding: nextBinding,
                            label: nextLabel,
                        });
                    } }) }), _jsx(FieldGroup, { label: "Format", className: classes.field, children: _jsx(Dropdown, { size: "small", value: control.format ?? 'text', selectedOptions: [control.format ?? 'text'], onOptionSelect: (_, d) => onUpdate(control.id, {
                        format: d.optionValue,
                    }), children: FIELD_FORMATS.map((f) => (_jsx(Option, { value: f, children: f }, f))) }) })] }));
};
