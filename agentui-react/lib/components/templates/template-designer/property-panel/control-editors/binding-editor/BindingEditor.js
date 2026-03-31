import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState } from 'react';
import { Input, Combobox, Option } from '@fluentui/react-components';
export const BindingEditor = ({ value, placeholder, bindingPaths, onChange, }) => {
    const [inputText, setInputText] = useState(value);
    const [open, setOpen] = useState(false);
    // Sync external value changes (e.g. when a different element is selected)
    const prevValue = useMemo(() => ({ v: value }), [value]);
    if (prevValue.v !== value && inputText !== value) {
        setInputText(value);
    }
    const filteredPaths = useMemo(() => {
        if (!inputText || inputText === value)
            return bindingPaths;
        const lower = inputText.toLowerCase();
        return bindingPaths.filter((p) => p.toLowerCase().includes(lower));
    }, [bindingPaths, inputText, value]);
    if (bindingPaths.length === 0) {
        return (_jsx(Input, { size: "small", placeholder: placeholder, value: value, onChange: (_, d) => onChange(d.value) }));
    }
    return (_jsxs(Combobox, { size: "small", freeform: true, placeholder: placeholder, value: inputText, selectedOptions: value && bindingPaths.includes(value) ? [value] : [], open: open, onOpenChange: (_, d) => setOpen(d.open), onChange: (e) => {
            const text = e.target.value;
            setInputText(text);
            setOpen(true);
        }, onOptionSelect: (_, d) => {
            if (d.optionValue !== undefined) {
                setInputText(d.optionValue);
                onChange(d.optionValue);
                setOpen(false);
            }
        }, onBlur: () => {
            if (inputText !== value) {
                onChange(inputText);
            }
        }, children: [filteredPaths.map((p) => (_jsx(Option, { value: p, children: p }, p))), filteredPaths.length === 0 && (_jsx(Option, { disabled: true, value: "", children: "No matching paths" }))] }));
};
