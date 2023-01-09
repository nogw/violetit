import { Maybe } from '@violetit/types';

const JWT_TOKEN_KEY = '@user/TOKEN';

export const getAuthToken = () => localStorage.getItem(JWT_TOKEN_KEY);

export const updateAuthToken = (token?: Maybe<string>) => {
  if (token) {
    localStorage.setItem(JWT_TOKEN_KEY, token);
  } else {
    localStorage.removeItem(JWT_TOKEN_KEY);
  }
};
