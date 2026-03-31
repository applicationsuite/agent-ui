import { createContext, useContext } from 'react';
export const AiAssistantContext = createContext(undefined);
export const useAiAssistantContext = () => {
    const context = useContext(AiAssistantContext);
    if (!context) {
        throw new Error('useAiAssistantContext must be used within an AiAssistantContextProvider');
    }
    return context;
};
