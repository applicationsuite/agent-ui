import { createContext, useContext } from 'react';
export const AuthContext = createContext(undefined);
export const useUserInfo = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useUserInfo must be used within an AuthProvider');
    }
    return context;
};
