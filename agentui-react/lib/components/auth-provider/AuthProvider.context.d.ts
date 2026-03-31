import type { IAuthContextValue } from './AuthProvider.models';
export declare const AuthContext: import("react").Context<IAuthContextValue | undefined>;
export declare const useUserInfo: () => IAuthContextValue;
