import { createContext, useContext } from 'react';

import type { IAuthContextValue } from './AuthProvider.models';

export const AuthContext = createContext<IAuthContextValue | undefined>(
  undefined,
);

export const useUserInfo = (): IAuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useUserInfo must be used within an AuthProvider');
  }
  return context;
};
