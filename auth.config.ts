import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isLoginPage = nextUrl.pathname.startsWith("/login")
      const isAuthRoutes =
        nextUrl.pathname.startsWith("/") ||
        nextUrl.pathname.startsWith("/message") ||
        nextUrl.pathname.startsWith("/enpoint")

      if (!isAuthRoutes && !isLoggedIn) return true

      if (isAuthRoutes && !isLoggedIn && !isLoginPage) return Response.redirect(new URL("/login", nextUrl))

      if (isLoggedIn && isLoginPage) return Response.redirect(new URL("/", nextUrl))

      return true
    },
    jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          emnify_token: user.emnify_token,
        }
      }
      return token
    },
    session({ session, token }) {
      // @ts-ignore
      session.user.emnify_token = token.emnify_token
      return session
    }
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;


//
