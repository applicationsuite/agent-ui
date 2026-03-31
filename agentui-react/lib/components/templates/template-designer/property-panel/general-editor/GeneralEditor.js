import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Input, Switch, Dropdown, Option } from '@fluentui/react-components';
import { ControlType } from '../../../templates.models';
import { CollapsibleSection, FieldGroup } from '../CollapsibleSection';
import { BUTTON_APPEARANCES, BUTTON_PLACEMENT_OPTIONS } from '../PropertyPanel.models';
import { IconPickerDialog } from '../../../common/icons/IconPickerDialog';
export const GeneralEditor = ({ control, onUpdate, classes, }) => {
    const isButton = control.type === ControlType.Button;
    const btn = isButton ? control : undefined;
    return (_jsxs(CollapsibleSection, { title: "General", classes: classes, children: [_jsx(FieldGroup, { label: "ID", className: classes.field, children: _jsx(Input, { size: "small", value: control.id, readOnly: true }) }), _jsx(FieldGroup, { label: "Label", className: classes.field, children: _jsx(Input, { size: "small", value: control.label ?? '', onChange: (_, d) => onUpdate(control.id, { label: d.value }) }) }), _jsxs("div", { className: classes.row, children: [_jsx(Switch, { label: "Visible", checked: control.visible ?? true, onChange: (_, d) => onUpdate(control.id, { visible: d.checked }) }), _jsx(Switch, { label: "Disabled", checked: control.disabled ?? false, onChange: (_, d) => onUpdate(control.id, { disabled: d.checked }) })] }), btn && (_jsxs(_Fragment, { children: [_jsx(FieldGroup, { label: "Appearance", className: classes.field, children: _jsx(Dropdown, { size: "small", value: btn.appearance ?? 'secondary', selectedOptions: [btn.appearance ?? 'secondary'], onOptionSelect: (_, d) => onUpdate(control.id, {
                                appearance: d.optionValue,
                            }), children: BUTTON_APPEARANCES.map((a) => (_jsx(Option, { value: a, children: a }, a))) }) }), _jsx(FieldGroup, { label: "Icon", className: classes.field, children: _jsx(IconPickerDialog, { value: btn.iconName, onChange: (iconName) => onUpdate(control.id, { iconName }) }) }), _jsx(FieldGroup, { label: "Tooltip", className: classes.field, children: _jsx(Input, { size: "small", placeholder: "Hover text for icon-only", value: btn.tooltip ?? '', onChange: (_, d) => onUpdate(control.id, { tooltip: d.value }) }) }), _jsx(FieldGroup, { label: "Placement", className: classes.field, children: _jsx(Dropdown, { size: "small", value: btn.placement ?? 'inline', selectedOptions: [btn.placement ?? 'inline'], onOptionSelect: (_, d) => onUpdate(control.id, {
                                placement: d.optionValue,
                            }), children: BUTTON_PLACEMENT_OPTIONS.map((p) => (_jsx(Option, { value: p, children: p }, p))) }) })] }))] }));
};
