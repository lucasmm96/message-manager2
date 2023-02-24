import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
	throw new Error('Add Mongo URI to .env.local');
}

const client = await MongoClient.connect(process.env.MONGODB_URI);
const db = client.db();

export default db;
