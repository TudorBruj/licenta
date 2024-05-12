'use server';

import { MongoClient } from 'mongodb';

export interface User {
  email: string;
  password: string;
}

const uri = process.env['MONGODB_URI'] ?? 'mongodb://localhost:27017';

const dbName = 'licenta';

const client = new MongoClient(uri);

export async function getUsers() {
  try {
    await client.connect();
    const userCollection = client.db(dbName).collection<User>('users');
    const cursor = userCollection.find({});
    const users = await cursor.toArray();
    return users;
  } finally {
    await client.close();
  }
}

export async function validateUser(email: string, password: string) {
  try {
    await client.connect();
    const userCollection = client.db(dbName).collection<User>('users');
    const user = await userCollection.findOne({ email });
    return user;
  } finally {
    await client.close();
  }
}
