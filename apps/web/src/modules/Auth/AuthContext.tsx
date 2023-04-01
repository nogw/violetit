import { Maybe } from '@violetit/types';

import React, { useState, useMemo, useCallback } from 'react';

import storage from '../../utils/storage';

export interface AuthContextValue {
  token: Maybe<string>;
  signin: (token: Maybe<string>, cb: VoidFunction) => void;
  signout: (cb: VoidFunction) => void;
}

export const AuthContext = React.createContext<AuthContextValue>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userToken, setUserToken] = useState<AuthContextValue['token']>(() => storage.getAuthToken());

  const signin = useCallback<AuthContextValue['signin']>((token, cb) => {
    storage.updateAuthToken(token);
    setUserToken(token);
    cb();
  }, []);

  const signout = useCallback<AuthContextValue['signout']>(cb => {
    storage.updateAuthToken();
    setUserToken(null);
    cb();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      token: userToken,
      signin,
      signout,
    }),
    [userToken, signin, signout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
