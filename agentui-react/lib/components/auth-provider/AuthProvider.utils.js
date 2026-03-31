import { AIAssistantPermission } from "../ai-assistant";
/**
 * Default utility that converts an array of raw role strings into
 * the permission set expected by the AI Assistant component.
 *
 * Consumers are free to supply their own mapping logic instead.
 */
export const mapRolesToPermissions = (roles = [], rolesToSearch = []) => {
    const permissions = [AIAssistantPermission.View];
    if (rolesToSearch && roles.some(role => rolesToSearch.includes(role))) {
        permissions.push(AIAssistantPermission.ManageTemplates);
        permissions.push(AIAssistantPermission.ManageStarterPrompts);
    }
    return permissions;
};
/** Check whether a specific permission is present in the given set. */
export const checkPermission = (permissions, permission) => permissions?.includes(permission) ?? false;
/**
 * Decodes a JWT token and extracts the user's name and email.
 */
export const getUserInfoFromToken = (token) => {
    const parts = token.split('.');
    if (parts.length !== 3) {
        return {};
    }
    const payload = JSON.parse(atob(parts[1]));
    return {
        name: payload.name ?? undefined,
        email: payload.email ?? payload.preferred_username ?? payload.upn ?? undefined,
    };
};
