import type { NextAuthConfig } from 'next-auth';
import { isAdminUser } from './lib/data/users.utils';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      if (isOnAdmin) return isAdminUser(auth?.user?.email); // allow only admin user on admin page
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
