'use server';

import { MongoClient, ObjectId } from 'mongodb';

export interface Review {
  _id: string | ObjectId;
  user_id: string;
  product_id: string;
  rating: number;
  comment: string;
}

const uri = process.env['MONGODB_URI'] ?? 'mongodb://localhost:27017';

const dbName = 'licenta';

const client = new MongoClient(uri);

export async function updateReview(review: Review) {
  try {
    await client.connect();
    const collection = client.db(dbName).collection<Review>('reviews');
    review._id = new ObjectId(review._id);
    await collection.findOneAndReplace({ _id: review._id }, review);
  } finally {
    await client.close();
  }
}

export async function getReviews() {
  try {
    await client.connect();
    const collection = client.db(dbName).collection<Review>('reviews');
    return await collection.find().toArray();
  } finally {
    await client.close();
  }
}

export async function addReview(review: Review) {
  try {
    await client.connect();
    const collection = client.db(dbName).collection<Review>('reviews');
    review._id = new ObjectId().toString();
    await collection.insertOne(review);
  } finally {
    await client.close();
  }
}
