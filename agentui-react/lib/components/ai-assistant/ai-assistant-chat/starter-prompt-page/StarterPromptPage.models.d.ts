import type { IEntity, IAIAssistantAgent, IAIAssistantStarterPrompt } from '../../AIAssistant.models';
export type { IEntity, IAIAssistantAgent, IAIAssistantStarterPrompt };
export interface IStarterPromptPageState {
    prompts: IEntity<IAIAssistantStarterPrompt[]>;
    /** null = closed, undefined = create, object = edit */
    panelTarget: IAIAssistantStarterPrompt | null | undefined;
    deleteTarget: IAIAssistantStarterPrompt | null;
    deleteError: string;
    isDeleting: boolean;
    isSaving: boolean;
    panelError: string;
    searchQuery: string;
}
export interface IStarterPromptPageProps {
    agents?: IAIAssistantAgent[];
    isSidebar?: boolean;
    initialData?: IEntity<IAIAssistantStarterPrompt[]>;
    onClose?: () => void;
}
