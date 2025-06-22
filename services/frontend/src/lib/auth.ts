// lib/auth.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshAccessToken(token: any) {
  try {
    const res = await fetch("http://localhost:8000/api/token/refresh/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh: token.refreshToken }),
    });
    const data = await res.json();

    if (!res.ok) throw new Error("Failed to refresh token");

    return {
      ...token,
      accessToken: data.access,
      // Opcional: actualiza el refreshToken si el backend lo devuelve renovado
      refreshToken: data.refresh || token.refreshToken,
    };
  } catch (error) {
    // Si falla, fuerza logout en el frontend
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

async function isTokenExpired(token: string) {
  try {
    const res = await fetch("http://localhost:8000/api/token/verify/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    return !res.ok;
  } catch {
    return true;
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:8000/api/token/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });

        const data = await res.json();
        if (res.ok && data.access) {
          return {
            accessToken: data.access,
            refreshToken: data.refresh,
            ...data,
          };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        return token;
      }
      const isExpired = await isTokenExpired(token.accessToken);
      if (isExpired) {
        console.log("Token expired, refreshing...");
        return await refreshAccessToken(token);
      }

      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.error = token.error;
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
