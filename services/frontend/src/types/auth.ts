import type { Session } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

export interface CustomUser {
  accessToken: string;
  refreshToken: string;
  username: string;
}

export interface CustomSession extends Session {
  accessToken?: string;
  refreshToken?: string;
  error?: string;
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    username?: string;
  };
}

export interface JWT {
  accessToken: string;
  refreshToken: string;
  username: string;
  error: string;
}

export type TokenResponse = {
  access: string;
  refresh: string;
};

export interface CustomJWT extends DefaultJWT {
  accessToken?: string;
  refreshToken?: string;
  username?: string;
  error?: string;
}
