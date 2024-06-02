'use server';

import { ObjectId } from 'mongodb';
import { addData, getData, removeData, updateData } from './base';

export interface User {
  _id: string | ObjectId;
  id: string;
  email: string;
  password: string;
  name: string;
}

export async function getUsers() {
  return await getData<User>('users');
}

export async function addUser(user: User) {
  await addData<User>('users', user);
}

export async function removeUser(id: string) {
  await removeData<User>('users', id);
}

export async function updateUser(user: User) {
  await updateData<User>('users', user);
}
