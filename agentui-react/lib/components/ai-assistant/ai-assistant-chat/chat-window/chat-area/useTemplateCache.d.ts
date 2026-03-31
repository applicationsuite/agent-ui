import type { IResolvedTemplate } from '../../../AIAssistant.models';
export interface IUseTemplateCacheResult {
    get: (messageId: string) => IResolvedTemplate | undefined;
    onResolved: (messageId: string, result: IResolvedTemplate) => void;
    clear: () => void;
}
export declare const useTemplateCache: () => IUseTemplateCacheResult;
