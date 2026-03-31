import { AIAssistantPermission, IUserInfo } from "../ai-assistant";
/**
 * Default utility that converts an array of raw role strings into
 * the permission set expected by the AI Assistant component.
 *
 * Consumers are free to supply their own mapping logic instead.
 */
export declare const mapRolesToPermissions: (roles?: string[], rolesToSearch?: string[]) => AIAssistantPermission[];
/** Check whether a specific permission is present in the given set. */
export declare const checkPermission: (permissions: AIAssistantPermission[] | undefined, permission: AIAssistantPermission) => boolean;
/**
 * Decodes a JWT token and extracts the user's name and email.
 */
export declare const getUserInfoFromToken: (token: string) => IUserInfo;
