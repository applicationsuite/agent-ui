import { useState, useEffect, useMemo } from 'react';
import type { IUserInfo } from '../ai-assistant/AIAssistant.models';
import { AuthContext } from './AuthProvider.context';
import { getUserInfoFromToken } from './AuthProvider.utils';
import { AuthProviderService } from './AuthProvider.services';
import { IAuthProviderProps } from './AuthProvider.models';

export const AuthProvider = (props: IAuthProviderProps) => {
 
  const [userInfo, setUserInfo] = useState<IUserInfo | undefined>(undefined);
  const [roles, setRoles] = useState<string[]>([]);


  useEffect(() => {
    const initializeAuth = async () => {
      const token = await props.getToken?.();
      let userInfoFromToken: IUserInfo | undefined = undefined;
      if (token) {
          userInfoFromToken = getUserInfoFromToken(token);
          setUserInfo(userInfoFromToken);
      }
      const service = props.service?? new AuthProviderService(props.config?.api?.baseUrl!, props.getToken);
      if(!service){
        console.error('AuthProviderService is required to fetch user roles.');
        throw new Error('AuthProviderService is required to fetch user roles.');
      }
      const roles = await service.getRoles(userInfoFromToken!);
      setRoles(roles);
    };

    initializeAuth();
  }, [ props.getToken,props.config, props.service]);

  const value = useMemo(
    () => {
      const contextValue = {
        userInfo: userInfo || undefined,
        roles,
      };
      return contextValue;
    }, [userInfo, roles]);

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
};
