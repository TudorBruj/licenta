'use server';

import {
  Filter,
  MongoClient,
  ObjectId,
  OptionalUnlessRequiredId,
} from 'mongodb';

const uri = process.env['MONGODB_URI'] ?? 'mongodb://localhost:27017';

const dbName = 'licenta';

const client = new MongoClient(uri);

export interface BaseData {
  _id: ObjectId | string;
  id: string;
}

export async function getData<T extends BaseData>(
  collectionName: string,
  filter: Filter<T> = {}
) {
  try {
    await client.connect();
    const collection = client.db(dbName).collection<T>(collectionName);
    const cursor = collection.find(filter);
    const data = await cursor.toArray();
    for (const element of data) {
      element.id = element._id.toString();
      // @ts-ignore
      element._id = element._id.toString();
    }
    return data;
  } finally {
    // await client.close();
  }
}

export async function getDataById<T extends BaseData>(
  collectionName: string,
  id: string
) {
  try {
    await client.connect();
    const collection = client.db(dbName).collection<T>(collectionName);
    let objectId;
    try {
      objectId = new ObjectId(id);
    } catch {
      objectId = null;
    }
    const data = await collection.findOne({
      _id: objectId,
    } as Filter<T>);
    if (data) {
      data.id = data._id.toString();
      // @ts-ignore
      data._id = data._id.toString();
    }
    return data;
  } finally {
    // await client.close();
  }
}

export async function addData<T extends BaseData>(
  collectionName: string,
  data: OptionalUnlessRequiredId<T>
) {
  try {
    await client.connect();
    const collection = client.db(dbName).collection<T>(collectionName);
    data._id = new ObjectId();
    data.id = data._id.toString();
    await collection.insertOne(data);
  } finally {
    // await client.close();
  }
}

export async function removeData<T extends BaseData>(
  collectionName: string,
  id: string
) {
  try {
    await client.connect();
    const collection = client.db(dbName).collection<T>(collectionName);
    await collection.deleteOne({ _id: new ObjectId(id) } as Filter<T>);
  } finally {
    // await client.close();
  }
}

export async function updateData<T extends BaseData>(
  collectionName: string,
  data: OptionalUnlessRequiredId<T>
) {
  try {
    await client.connect();
    const collection = client.db(dbName).collection<T>(collectionName);
    data._id = new ObjectId(data.id);
    await collection.findOneAndReplace({ _id: data._id } as Filter<T>, data);
  } finally {
    // await client.close();
  }
}
