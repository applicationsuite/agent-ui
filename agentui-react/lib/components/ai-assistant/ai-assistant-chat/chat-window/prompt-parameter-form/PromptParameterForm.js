import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback, useEffect, useRef } from 'react';
import { Button, mergeClasses } from '@fluentui/react-components';
import { Dismiss12Regular, ArrowRight24Filled } from '@fluentui/react-icons';
import { usePromptFormStyles } from './PromptParameterForm.styles';
import { resolvePrompt } from './PromptParameterForm.utils';
import { getFieldRenderer } from './ParameterField';
export const PromptParameterForm = ({ open, title, promptTemplate, parameters, templateType, onSubmit, onCancel, }) => {
    const classes = usePromptFormStyles();
    const firstInputRef = useRef(null);
    const [values, setValues] = useState({});
    useEffect(() => {
        if (open) {
            const initial = {};
            for (const param of parameters) {
                initial[param] = '';
            }
            setValues(initial);
            requestAnimationFrame(() => firstInputRef.current?.focus());
        }
    }, [open, parameters]);
    const handleFieldChange = useCallback((param, value) => {
        setValues((prev) => ({ ...prev, [param]: value }));
    }, []);
    const allFieldsFilled = parameters.every((param) => (values[param] ?? '').trim().length > 0);
    const handleSubmit = useCallback(() => {
        if (!allFieldsFilled)
            return;
        const resolved = resolvePrompt(promptTemplate, parameters, values);
        onSubmit(resolved);
    }, [allFieldsFilled, promptTemplate, parameters, values, onSubmit]);
    const handleKeyDown = useCallback((e) => {
        if (e.key === 'Enter' && !e.shiftKey && allFieldsFilled) {
            e.preventDefault();
            handleSubmit();
        }
        if (e.key === 'Escape') {
            e.preventDefault();
            onCancel();
        }
    }, [allFieldsFilled, handleSubmit, onCancel]);
    const FieldComponent = getFieldRenderer(templateType);
    if (!open || !FieldComponent)
        return null;
    const lastIndex = parameters.length - 1;
    return (_jsxs("div", { className: classes.wrapper, onKeyDown: handleKeyDown, children: [_jsxs("div", { className: classes.topRow, children: [_jsx("span", { className: classes.titleBadge, children: title }), _jsx(Button, { appearance: "transparent", size: "small", "aria-label": "Cancel", className: classes.dismissButton, icon: _jsx(Dismiss12Regular, {}), onClick: onCancel })] }), _jsx("div", { className: classes.fields, children: parameters.map((param, index) => (_jsxs("div", { className: classes.inputRow, children: [_jsx("div", { className: classes.inputGrow, children: _jsx(FieldComponent, { name: param, value: values[param] ?? '', onChange: (val) => handleFieldChange(param, val), inputRef: index === 0 ? firstInputRef : undefined }) }), index === lastIndex ? (_jsx(Button, { appearance: "transparent", "aria-label": "Send", className: mergeClasses(classes.sendButton, allFieldsFilled && classes.sendButtonActive), disabled: !allFieldsFilled, onClick: handleSubmit, icon: _jsx(ArrowRight24Filled, {}) })) : (_jsx("div", { className: classes.sendButtonSpacer }))] }, param))) })] }));
};
