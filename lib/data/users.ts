'use server';

import { MongoClient, ObjectId } from 'mongodb';

export interface User {
  _id: string | ObjectId;
  id: string;
  email: string;
  password: string;
  name: string;
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

export async function addUser(user: User) {
  try {
    await client.connect();
    const collection = client.db(dbName).collection<User>('users');
    user._id = new ObjectId();
    await collection.insertOne(user);
  } finally {
    await client.close();
  }
}

export async function removeUser(id: string) {
  try {
    await client.connect();
    const collection = client.db(dbName).collection<User>('users');
    await collection.deleteOne({ _id: new ObjectId(id) });
  } finally {
    await client.close();
  }
}

export async function updateUser(user: User) {
  try {
    await client.connect();
    const collection = client.db(dbName).collection<User>('users');
    user._id = new ObjectId(user._id);
    await collection.findOneAndReplace({ _id: user._id }, user);
  } finally {
    await client.close();
  }
}
