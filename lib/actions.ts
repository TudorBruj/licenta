'use server';

import { signIn } from '@/auth';
import { redirect } from 'next/navigation';
import { isAdminUser } from './data/users.utils';

export async function authenticate(_currentState: unknown, formData: FormData) {
  const email = <string>formData.get('email');
  const password = <string>formData.get('password');
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
  } catch (error: any) {
    if (error) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  } finally {
    redirect(isAdminUser(email) ? '/admin' : '/');
  }
}
