const { VITE_GRAPHQL_URL } = import.meta.env;

export const GRAPHQL_URL = VITE_GRAPHQL_URL as string;
