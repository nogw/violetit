import { Maybe } from '@violetit/types';

const JWT_TOKEN_KEY = '@violetit_react_token';

export const getAuthToken = () => {
  return localStorage.getItem(JWT_TOKEN_KEY);
};

export const updateAuthToken = (token?: Maybe<string>) => {
  if (!token || token === '' || token === null) {
    localStorage.removeItem(JWT_TOKEN_KEY);
  } else {
    localStorage.setItem(JWT_TOKEN_KEY, token);
  }
};

export default {
  getAuthToken,
  updateAuthToken,
};
