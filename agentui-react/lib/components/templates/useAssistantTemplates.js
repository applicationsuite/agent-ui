import { useCallback } from 'react';
import { getTemplateComponent } from './templateRegistry';
export const useAssistantTemplates = () => {
    const getTemplate = useCallback((template) => {
        return getTemplateComponent(template);
    }, []);
    return {
        getTemplate,
    };
};
