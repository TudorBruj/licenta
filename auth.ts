import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { getUser } from './lib/data/users';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;
        if (typeof email !== 'string') return null;

        const user = await getUser(email);
        if (user?.password === password) return user;
        return null;
      },
    }),
  ],
});
