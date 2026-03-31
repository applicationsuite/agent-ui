import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { SpinButton } from '@fluentui/react-components';
import { CollapsibleSection, FieldGroup } from '../CollapsibleSection';
import { BindingEditor } from './binding-editor/BindingEditor';
export const ProgressBarEditor = ({ control, onUpdate, classes, bindingPaths, }) => (_jsxs(CollapsibleSection, { title: "Progress", classes: classes, children: [_jsx(FieldGroup, { label: "Value", className: classes.field, children: _jsx(SpinButton, { size: "small", value: control.value ?? 0, min: 0, onChange: (_, d) => onUpdate(control.id, {
                    value: d.value ?? 0,
                }) }) }), _jsx(FieldGroup, { label: "Binding", className: classes.field, children: _jsx(BindingEditor, { placeholder: "e.g. progress.percent", bindingPaths: bindingPaths, value: control.binding ?? '', onChange: (v) => onUpdate(control.id, {
                    binding: v || undefined,
                }) }) }), _jsx(FieldGroup, { label: "Max", className: classes.field, children: _jsx(SpinButton, { size: "small", value: control.max ?? 100, min: 1, onChange: (_, d) => onUpdate(control.id, {
                    max: d.value ?? 100,
                }) }) })] }));
