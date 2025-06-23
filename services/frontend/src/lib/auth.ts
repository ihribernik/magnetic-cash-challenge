import { DJANGO_API_URL } from "@/constants/auth";
import { CustomJWT, CustomSession, CustomUser } from "@/types/auth";
import type {
  Account,
  NextAuthOptions,
  Profile,
  Session,
  User,
} from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export async function getValidAccessToken(session: CustomSession | null) {
  if (!session?.accessToken) return null;

  const expired = await isTokenExpired(session.accessToken);

  if (!expired) return session.accessToken;

  if (!session.refreshToken) return null;

  const refreshed = await refreshAccessToken(session.refreshToken);

  return refreshed.accessToken || null;
}

async function refreshAccessToken(token: string) {
  try {

    const res = await fetch(`${DJANGO_API_URL}/api/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: token }),
    });

    if (!res.ok) throw new Error("Failed to refresh token");

    const data = await res.json();

    return {
      accessToken: data.access,
      refreshToken: data.refresh || token,
    };
  } catch {
    return {
      accessToken: null,
      refreshToken: null,
      error: "RefreshAccessTokenError",
    };
  }
}

async function isTokenExpired(token: string) {

  const res = await fetch(`${DJANGO_API_URL}/api/token/verify/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token }),
  });

  return !res.ok;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {

        const res = await fetch(`${DJANGO_API_URL}/api/token/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        const data = await res.json();
        console.log("Authorization response:", data);
        if (res.ok && data.access) {
          console.log("User authenticated successfully:", data);
          return {
            id: credentials?.username || "",
            accessToken: data.access,
            refreshToken: data.refresh,
            username: credentials?.username,
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: CustomJWT;
      user?: CustomUser | User;
      account?: Account | null;
      profile?: Profile;
      isNewUser?: boolean;
    }) {
      if (user) {
        token.accessToken = (user as CustomUser).accessToken;
        token.refreshToken = (user as CustomUser).refreshToken;
        token.username = (user as CustomUser).username;
        return token;
      }

      const isExpired = await isTokenExpired(token.accessToken!);

      if (isExpired) {
        console.log("Token expired, refreshing...");
        const refreshed = await refreshAccessToken(token.refreshToken!);
        return {
          ...token,
          ...refreshed,
        };
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: CustomJWT }) {
      (session as CustomSession).accessToken = token.accessToken;
      (session as CustomSession).refreshToken = token.refreshToken;
      (session as CustomSession).error = token.error;
      if (token.username) {
        (session.user as typeof session.user & { username?: string }).username =
          token.username;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
