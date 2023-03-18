declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VITE_GRAPHQL_URL: string;
    }
  }
}

export {};
