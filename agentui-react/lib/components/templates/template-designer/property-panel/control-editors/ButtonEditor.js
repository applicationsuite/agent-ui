import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox } from '@fluentui/react-components';
import { CollapsibleSection, FieldGroup } from '../CollapsibleSection';
import { ActionBindingInput } from './binding-editor/ActionBindingInput';
export const ButtonEditor = ({ control, onUpdate, classes, bindingPaths, inputFieldInfo = [], }) => {
    const inputFieldPaths = inputFieldInfo.map((f) => f.name);
    const pathLabels = Object.fromEntries(inputFieldInfo.map((f) => [f.name, f.label]));
    return (_jsxs(CollapsibleSection, { title: "Action", classes: classes, children: [_jsx(FieldGroup, { label: "Prompt", className: classes.field, children: _jsx(ActionBindingInput, { placeholder: "e.g. Show details for order {orderId}", bindingPaths: inputFieldPaths, globalBindingPaths: bindingPaths, pathLabels: pathLabels, value: control.prompt, onChange: (v) => onUpdate(control.id, { prompt: v }) }) }), inputFieldInfo.length > 0 && (_jsx(FieldGroup, { label: "", className: classes.field, children: _jsx(Checkbox, { label: "Validate form before action", checked: control.validateForm ?? false, onChange: (_, data) => onUpdate(control.id, {
                        validateForm: !!data.checked,
                    }) }) }))] }));
};
