import { jsx as _jsx } from "react/jsx-runtime";
import { Text } from '@fluentui/react-components';
import { TemplateCard } from './control-renderer/TemplateCard';
/**
 * Renders an ITemplate against server data.
 *
 * Receives `ITemplateComponentProps` from the AI Assistant.
 * Expects `data` to contain:
 *   - `template`: the ITemplate JSON (card + bindings)
 *   - `serverData`: the raw data from the server
 *
 * Or alternatively, `data` itself can be the ITemplate with
 * a sibling `serverData` key.
 */
export const TemplateRenderer = (props) => {
    const { data: propsData, onAction } = props;
    const template = (propsData?.template ?? propsData);
    const data = (propsData?.serverData ?? {});
    if (!template?.card) {
        return _jsx(Text, { children: "No template data available." });
    }
    return _jsx(TemplateCard, { ...template.card, data: data, onAction: onAction });
};
export default TemplateRenderer;
