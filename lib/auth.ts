'use server';

import { signOut as signOutAuth } from '@/auth';

export async function signOut() {
  return await signOutAuth();
}
