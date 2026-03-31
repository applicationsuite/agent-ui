import { AIAssistantFeature } from '../../AIAssistant.models';
interface ISettingsPageProps {
    isSidebar?: boolean;
    isDeveloperMode: boolean;
    useRawResponse: boolean;
    onClose?: () => void;
    onToggleDeveloperMode: () => void;
    onToggleRawResponse: () => void;
    features?: AIAssistantFeature[];
}
export declare const SettingsPage: (props: ISettingsPageProps) => import("react/jsx-runtime").JSX.Element;
export {};
