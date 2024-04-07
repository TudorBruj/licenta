"use server"

import { MongoClient, ObjectId } from "mongodb";

export interface Product{
    _id: string | ObjectId,
    id: string,
    name: string,
    description: string,
    price: number,
    category: string,
    color: string,
    images: string
}

const uri = process.env["MONGODB_URI"] ?? "mongodb://localhost:27017";

const dbName = "licenta"

const client = new MongoClient(uri);

export async function getProducts() {
    try {
        await client.connect();
        const collection = client.db(dbName).collection<Product>("products");
        const cursor = collection.find({}) 
        const data = await cursor.toArray()
        for (const element of data) {
            element.id = element._id.toString()
            element._id = element._id.toString()
        }
        return data
      } finally {
        await client.close();
      }
}

export async function getProductsByCategory(category: string) {
    try {
        await client.connect();
        const collection = client.db(dbName).collection<Product>("products");
        const cursor = collection.find({category}) 
        const data = await cursor.toArray()
        for (const element of data) {
            element.id = element._id.toString()
            element._id = element._id.toString()
        }
        return data
      } finally {
        await client.close();
      }
}

export async function getProductById(id: string) {
    try {
        await client.connect();
        const collection = client.db(dbName).collection<Product>("products");
        const data = await collection.findOne({id}) 
        if (data) {
            data.id = data._id.toString()
            data._id = data._id.toString()
        }
        return data
      } finally {
        await client.close();
      }
}
