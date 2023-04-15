declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      JWT_KEY: string;
      NODE_ENV: string;
      MONGO_URI: string;
    }
  }
}

export {};
