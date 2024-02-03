// import dotenv from "dotenv";
// dotenv.config();
import { MongoClient, Db } from "mongodb";

let databaseUrl: string;

if (process.env.DATABASE_URL) {
    databaseUrl = process.env.DATABASE_URL;
} else {
    console.log(`DATABASE_URL not specified in .env file \n
      > possible solution 
         1. Create a .env file in root directory & add DATABASE_URL with database url string
         Demo:- DATABASE_URL=mongodb://127.0.0.1:27017/note-keeper
    `);
    throw new Error("DATABASE_URL must be specified in .env file");
}
let database: Db;

// here the callback function will be called after the database connection is established successfully with no error argument but if the database connection fails the callback function will also be called with error argument. From the error argument we can then decide whether whether the server should start(listen) or not start.

function connectToDatabase(callbackFunction: (err?: Error) => void): void {
    MongoClient.connect(databaseUrl)
        .then((client) => {
            console.log("Connected to database");
            database = client.db();
            return callbackFunction();
        })
        .catch((error) => {
            console.log(error);
            return callbackFunction(error);
        });
}

// This will return the database after the connection has been established to interact with MongoDB database
function getDatabase(): Db {
    return database;
}

export { connectToDatabase, getDatabase };
