export var AIAssistantDisplayMode;
(function (AIAssistantDisplayMode) {
    AIAssistantDisplayMode["SidePanel"] = "SidePanel";
    AIAssistantDisplayMode["FullScreen"] = "FullScreen";
})(AIAssistantDisplayMode || (AIAssistantDisplayMode = {}));
export var AIAssistantFeature;
(function (AIAssistantFeature) {
    AIAssistantFeature["ConversationHistory"] = "conversation_history";
    AIAssistantFeature["StarterPrompts"] = "starter_prompts";
    AIAssistantFeature["Templates"] = "templates";
    AIAssistantFeature["Settings"] = "settings";
    AIAssistantFeature["DynamicUi"] = "dynamic_ui";
    AIAssistantFeature["DeveloperTools"] = "developer_tools";
})(AIAssistantFeature || (AIAssistantFeature = {}));
export const hasFeature = (features, feature) => !features || features.includes(feature);
export var AIAssistantActionType;
(function (AIAssistantActionType) {
    AIAssistantActionType["SetModel"] = "SetModel";
    AIAssistantActionType["SendMessage"] = "SendMessage";
    AIAssistantActionType["CancelMessage"] = "CancelMessage";
    AIAssistantActionType["LoadConversation"] = "LoadConversation";
})(AIAssistantActionType || (AIAssistantActionType = {}));
export const CANCELLED_MESSAGE = 'The request has been cancelled.';
export const DEFAULT_DEPLOYMENT = 'gpt-5.2';
export const DEFAULT_API_VERSION = '2024-05-01-preview';
export const AI_ASSISTANT_HEADER_TEXT = 'AI Assistant';
/**
 * Centralized permission definitions for the AI Assistant component.
 *
 * Consumers map their own role/authorization data into these permissions
 * and pass them as a prop — the component never evaluates roles directly.
 */
export var AIAssistantPermission;
(function (AIAssistantPermission) {
    AIAssistantPermission["View"] = "view";
    AIAssistantPermission["ManageTemplates"] = "manage_templates";
    AIAssistantPermission["ManageStarterPrompts"] = "manage_starter_prompts";
})(AIAssistantPermission || (AIAssistantPermission = {}));
