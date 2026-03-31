import { jsx as _jsx } from "react/jsx-runtime";
import { Input } from '@fluentui/react-components';
import { PromptTemplateType } from './PromptParameterForm.models';
import { useFieldStyles } from './PromptParameterForm.styles';
import { prettifyParamName } from './PromptParameterForm.utils';
const PlaceholderTextField = ({ name, value, onChange, inputRef, }) => {
    const classes = useFieldStyles();
    const label = prettifyParamName(name);
    return (_jsx(Input, { className: classes.input, size: "medium", value: value, onChange: (_, data) => onChange(data.value), placeholder: `Enter ${label}`, autoComplete: "off", appearance: "filled-lighter", input: { ref: inputRef } }));
};
const fieldRenderers = {
    [PromptTemplateType.PlaceholderText]: PlaceholderTextField,
};
export const getFieldRenderer = (templateType) => {
    return fieldRenderers[templateType];
};
