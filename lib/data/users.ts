import { MongoClient } from "mongodb";

export interface Users{
    email: string,
    password: string
}

const uri = process.env["MONGODB_URI"] ?? "mongodb://localhost:27017";

const client = new MongoClient(uri);

export async function getUsers () {
    try {
        await client.connect();
        const userCollection = client.db("licenta").collection<Users>("users");
        const cursor = userCollection.find({}) 
        const users = await cursor.toArray()
        return users
      } finally {
        await client.close();
      }
}