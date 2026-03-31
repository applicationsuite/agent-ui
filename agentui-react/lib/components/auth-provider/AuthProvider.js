import { jsx as _jsx } from "react/jsx-runtime";
import { useState, useEffect, useMemo } from 'react';
import { AuthContext } from './AuthProvider.context';
import { getUserInfoFromToken } from './AuthProvider.utils';
import { AuthProviderService } from './AuthProvider.services';
export const AuthProvider = (props) => {
    const [userInfo, setUserInfo] = useState(undefined);
    const [roles, setRoles] = useState([]);
    useEffect(() => {
        const initializeAuth = async () => {
            const token = await props.getToken?.();
            let userInfoFromToken = undefined;
            if (token) {
                userInfoFromToken = getUserInfoFromToken(token);
                setUserInfo(userInfoFromToken);
            }
            const service = props.service ?? new AuthProviderService(props.config?.api?.baseUrl, props.getToken);
            if (!service) {
                console.error('AuthProviderService is required to fetch user roles.');
                throw new Error('AuthProviderService is required to fetch user roles.');
            }
            const roles = await service.getRoles(userInfoFromToken);
            setRoles(roles);
        };
        initializeAuth();
    }, [props.getToken, props.config, props.service]);
    const value = useMemo(() => {
        const contextValue = {
            userInfo: userInfo || undefined,
            roles,
        };
        return contextValue;
    }, [userInfo, roles]);
    return (_jsx(AuthContext.Provider, { value: value, children: props.children }));
};
