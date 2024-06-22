import type { NextAuthConfig } from 'next-auth';
import { isAdminUser } from './lib/data/users.utils';

export const authConfig = {
  trustHost: true,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      if (isOnAdmin) return isAdminUser(auth?.user?.email); // allow only admin user on admin page
      return true;
    },
    session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
    jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
