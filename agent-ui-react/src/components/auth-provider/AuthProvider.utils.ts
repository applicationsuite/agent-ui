import { AIAssistantPermission, IUserInfo } from "../ai-assistant";

/**
 * Default utility that converts an array of raw role strings into
 * the permission set expected by the AI Assistant component.
 *
 * Consumers are free to supply their own mapping logic instead.
 */
export const mapRolesToPermissions = (
  roles: string[] = [],
  rolesToSearch: string[] = [],
): AIAssistantPermission[] => {
  const permissions: AIAssistantPermission[] = [AIAssistantPermission.View];

  if (rolesToSearch && roles.some(role => rolesToSearch.includes(role))) {
    permissions.push(AIAssistantPermission.ManageTemplates);
    permissions.push(AIAssistantPermission.ManageStarterPrompts);
  }

  return permissions;
};

/** Check whether a specific permission is present in the given set. */
export const checkPermission = (
  permissions: AIAssistantPermission[] | undefined,
  permission: AIAssistantPermission,
): boolean => permissions?.includes(permission) ?? false;


/**
 * Decodes a JWT token and extracts the user's name and email.
 */
export const getUserInfoFromToken = (token: string): IUserInfo => {
    const parts = token.split('.');
    if (parts.length !== 3) {
        return {};
    }
    const payload = JSON.parse(atob(parts[1])) as Record<string, unknown>;
    return {
        name: (payload.name as string) ?? undefined,
        email: (payload.email as string) ?? (payload.preferred_username as string) ?? (payload.upn as string) ?? undefined,
    };
}