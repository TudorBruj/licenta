'use server';

import { signIn } from '@/auth';
import { redirect } from 'next/navigation';

export async function authenticate(_currentState: unknown, formData: FormData) {
  try {
    await signIn('credentials', formData);
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
    redirect('/admin');
  }
}