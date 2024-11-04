import { InterfaceUser } from '../../models/userModel';

declare module 'express-serve-static-core' {
  export interface Request {
    user: InterfaceUser;
  }
}

declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_USER: string;
    MONGO_PASSWORD: string;
    MONGO_URL: string;
    MONGO_URI: string;
    NODE_ENV: string;
    PORT: string;
  }
}
