import { jsx as _jsx } from "react/jsx-runtime";
import { Button as FluentButton, Tooltip } from '@fluentui/react-components';
import { toReactStyle } from '../common.utils';
import { useFormContext } from '../form/FormContext';
import { getFluentIconComponent } from '../icons/fluentIcons';
/**
 * Resolve `{key}` placeholders in a prompt template against a data object.
 */
function resolvePromptTemplate(template, data) {
    return template.replace(/\{(\w+(?:\.\w+)*)\}/g, (_match, key) => {
        const val = key.split('.').reduce((obj, k) => {
            if (obj != null && typeof obj === 'object') {
                return obj[k];
            }
            return undefined;
        }, data);
        return val != null ? String(val) : '';
    });
}
export const Button = (props) => {
    const { prompt, data, serverData, appearance, disabled, label, style, onAction, validateForm, iconName, tooltip } = props;
    const formCtx = useFormContext();
    const Icon = getFluentIconComponent(iconName);
    const handleClick = () => {
        // If validateForm is set, validate all fields in the FormContext first
        if (validateForm && formCtx) {
            const isValid = formCtx.validate();
            if (!isValid)
                return;
        }
        // Merge: serverData (global) < form values (context) < button data (explicit)
        const formValues = formCtx?.values ?? {};
        const mergedData = { ...serverData, ...formValues, ...data };
        const resolvedPrompt = resolvePromptTemplate(prompt, mergedData);
        onAction?.(prompt, {
            prompt: resolvedPrompt,
            data: mergedData,
        });
    };
    const iconEl = Icon ? _jsx(Icon, {}) : undefined;
    const hasLabel = !!label;
    const hasIcon = !!iconEl;
    const isIconOnly = hasIcon && !hasLabel;
    const button = (_jsx(FluentButton, { appearance: isIconOnly ? 'transparent' : (appearance ?? 'secondary'), disabled: disabled, style: toReactStyle(style), onClick: handleClick, icon: hasIcon ? iconEl : undefined, iconPosition: "before", children: hasLabel && label }));
    // Wrap icon-only buttons in a tooltip so the label is still accessible
    if (isIconOnly) {
        return (_jsx(Tooltip, { content: tooltip || 'Button', relationship: "label", children: button }));
    }
    return button;
};
