import { IUserInfo } from "../ai-assistant";
export interface IAuthProviderService {
    getRoles: (userInfo: IUserInfo) => Promise<string[]>;
}
export declare class AuthProviderService implements IAuthProviderService {
    private readonly apiBaseUrl;
    private readonly getToken;
    constructor(apiBaseUrl: string, getToken: () => Promise<string>);
    private getRequiredAccessToken;
    getRoles: () => Promise<string[]>;
}
