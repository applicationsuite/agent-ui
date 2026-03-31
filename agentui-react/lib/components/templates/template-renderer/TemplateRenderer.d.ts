import type { ITemplateComponentProps } from '../../ai-assistant/AIAssistant.models';
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
export declare const TemplateRenderer: (props: ITemplateComponentProps) => import("react/jsx-runtime").JSX.Element;
export default TemplateRenderer;
