import { MongoClient } from "mongodb";

const mongoClient = new MongoClient(process.env.MONGO_URI);

try {
    await mongoClient.connect();
    console.log("MongoDB is connected!");
} catch (error) {
    console.log(error);
}

let db = mongoClient.db("mywallet");
export default db;