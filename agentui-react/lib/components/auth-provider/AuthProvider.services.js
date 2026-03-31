export class AuthProviderService {
    constructor(apiBaseUrl, getToken) {
        Object.defineProperty(this, "apiBaseUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "getToken", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "getRequiredAccessToken", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async () => {
                const token = (await this.getToken()).trim();
                if (!token) {
                    throw new Error('AIAssistant access token is required.');
                }
                return token;
            }
        });
        Object.defineProperty(this, "getRoles", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async () => {
                let responseData = [];
                try {
                    const token = await this.getRequiredAccessToken();
                    const headers = {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    };
                    const response = await fetch(`${this.apiBaseUrl}/user/roles`, {
                        method: 'GET',
                        headers,
                    });
                    responseData = await response.json();
                }
                catch (error) {
                    console.error('Error fetching user roles:', error);
                }
                return responseData;
            }
        });
        this.apiBaseUrl = apiBaseUrl;
        this.getToken = getToken;
    }
}
