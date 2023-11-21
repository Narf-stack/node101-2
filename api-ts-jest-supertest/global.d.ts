namespace NodeJS {
  interface ProcessEnv {
    PORT: number;
    MONGO_URI: string;
    SALT_WORK_FACTOR: string;
    JWT_PUBLIC_KEY:string;
    JWT_PRIVATE_KEY:string;
    JWT_EXPIRES_IN: string;
    JWT_REFRESH_TOKEN_TTL: string
  }
}