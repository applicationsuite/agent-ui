import { IUserInfo } from "../ai-assistant";

export interface IAuthProviderService {
    getRoles: (userInfo: IUserInfo) => Promise<string[]>;
}


export class AuthProviderService implements IAuthProviderService {
    private readonly apiBaseUrl: string;
    private readonly getToken: () => Promise<string>;


    constructor(apiBaseUrl: string, getToken: () => Promise<string>) {
        this.apiBaseUrl = apiBaseUrl;
        this.getToken = getToken;
    }


    private getRequiredAccessToken = async (): Promise<string> => {
        const token = (await this.getToken()).trim();
        if (!token) {
            throw new Error('AIAssistant access token is required.');
        }
        return token;
    };
    
    getRoles = async (): Promise<string[]> => {
        let responseData = [];
        try {
            const token = await this.getRequiredAccessToken();
            const headers: Record<string, string> = {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            };
            const response = await fetch(`${this.apiBaseUrl}/user/roles`, {
                method: 'GET',
                headers,
            });


            responseData = await response.json();
        } catch (error) {
            console.error('Error fetching user roles:', error);
        }
        return responseData;
    };

}