declare namespace NodeJS {
  interface ProcessEnv {
    CORS_ORIGIN: string;
    PORT: string;
    HEADLESS: string;
  }
}