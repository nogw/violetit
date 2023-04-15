import { Maybe } from '@violetit/types';

import React, { useState, useMemo, useCallback } from 'react';

import { delAuthToken, getAuthToken, setAuthToken } from 'src/utils/cookies';

interface AuthContextValue {
  token: Maybe<string>;
  signin: (token: Maybe<string>, cb: VoidFunction) => void;
  signout: (cb: VoidFunction) => void;
}

export const AuthContext = React.createContext({} as AuthContextValue);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userToken, setUserToken] = useState<AuthContextValue['token']>(() => getAuthToken());

  const signin = useCallback<AuthContextValue['signin']>((token, cb) => {
    setAuthToken(token || '');
    setUserToken(token);
    cb();
  }, []);

  const signout = useCallback<AuthContextValue['signout']>(cb => {
    setUserToken(null);
    delAuthToken();
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
