import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input, Textarea, Dropdown, Option, Checkbox, Switch, RadioGroup, Radio, SpinButton, makeStyles, } from '@fluentui/react-components';
import { formStyles } from './FormControl.styles';
import { toReactStyle } from '../common.utils';
const useStyles = makeStyles(formStyles);
export const FormInput = ({ field, value, error, onChange, }) => {
    const classes = useStyles();
    const { name, label, inputType, placeholder, required, options, step, rows, disabled, style, } = field;
    const renderInput = () => {
        switch (inputType) {
            case 'text':
                return (_jsx(Input, { value: String(value ?? ''), placeholder: placeholder, disabled: disabled, onChange: (_, data) => onChange(name, data.value) }));
            case 'textarea':
                return (_jsx(Textarea, { value: String(value ?? ''), placeholder: placeholder, disabled: disabled, rows: rows ?? 3, resize: "vertical", onChange: (_, data) => onChange(name, data.value) }));
            case 'number':
                return (_jsx(SpinButton, { value: value != null ? Number(value) : undefined, placeholder: placeholder, disabled: disabled, step: step ?? 1, onChange: (_, data) => onChange(name, data.value ?? data.displayValue ?? null) }));
            case 'date':
                return (_jsx(Input, { type: "date", value: String(value ?? ''), disabled: disabled, onChange: (_, data) => onChange(name, data.value) }));
            case 'dropdown':
                return (_jsx(Dropdown, { value: options?.find((o) => o.value === String(value ?? ''))?.label ??
                        String(value ?? ''), selectedOptions: value != null ? [String(value)] : [], placeholder: placeholder ?? 'Select an option', disabled: disabled, onOptionSelect: (_, data) => onChange(name, data.optionValue ?? null), children: (options ?? []).map((opt) => (_jsx(Option, { value: opt.value, children: opt.label }, opt.value))) }));
            case 'checkbox':
                return (_jsx(Checkbox, { checked: Boolean(value), disabled: disabled, label: undefined, onChange: (_, data) => onChange(name, data.checked === true) }));
            case 'toggle':
                return (_jsx(Switch, { checked: Boolean(value), disabled: disabled, onChange: (_, data) => onChange(name, data.checked) }));
            case 'radio':
                return (_jsx(RadioGroup, { value: String(value ?? ''), disabled: disabled, onChange: (_, data) => onChange(name, data.value), layout: "horizontal", children: (options ?? []).map((opt) => (_jsx(Radio, { value: opt.value, label: opt.label }, opt.value))) }));
            default:
                return null;
        }
    };
    return (_jsxs("div", { className: classes.fieldWrapper, style: toReactStyle(style), children: [inputType !== 'checkbox' && inputType !== 'toggle' && (_jsxs("label", { className: classes.label, children: [label, required && _jsx("span", { className: classes.required, children: "*" })] })), (inputType === 'checkbox' || inputType === 'toggle') && (_jsxs("label", { className: classes.label, children: [renderInput(), ' ', label, required && _jsx("span", { className: classes.required, children: "*" })] })), inputType !== 'checkbox' && inputType !== 'toggle' && renderInput(), error && _jsx("span", { className: classes.error, children: error })] }));
};
