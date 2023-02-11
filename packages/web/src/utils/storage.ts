const JWT_TOKEN_KEY = '@violetit_react_token';

const storage = {
  setAuthToken: (token: string) => localStorage.setItem(JWT_TOKEN_KEY, token),
  getAuthToken: () => localStorage.getItem(JWT_TOKEN_KEY),
  delAuthToken: () => localStorage.removeItem(JWT_TOKEN_KEY),
};

export default storage;
