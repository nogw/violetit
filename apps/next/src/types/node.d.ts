declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_GRAPHQL_ENDPOINT: string;
    }
  }
}
