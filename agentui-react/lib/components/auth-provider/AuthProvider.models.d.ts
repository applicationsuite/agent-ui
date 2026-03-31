import type { IUserInfo } from '../ai-assistant/AIAssistant.models';
import { IAuthProviderService } from './AuthProvider.services';
export interface IAuthProviderConfig {
    api: {
        baseUrl: string;
    };
}
export interface IAuthProviderBaseProps {
    children: React.ReactNode;
    getToken: () => Promise<string>;
}
export type IAuthProviderProps = IAuthProviderBaseProps & ({
    config: IAuthProviderConfig;
    service?: IAuthProviderService;
} | {
    config?: undefined;
    service: IAuthProviderService;
});
export interface IAuthContextValue {
    userInfo?: IUserInfo;
    roles?: string[];
}
