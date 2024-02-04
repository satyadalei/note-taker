import dotenv from 'dotenv';
dotenv.config();

import express from "express"
import bodyParser from "body-parser"
import { Db } from 'mongodb';
import cors from "cors"
import { Request, Response } from "express";

import { logReqRes } from "./middlewares/reqreslogger"
import { connectToDatabase, getDatabase } from "./dbConnection"
import useRouter from "./routes/user"
import noteRouter from "./routes/note"
import {corsOptions} from "./config/corsConfig"


const app = express();

// Global middlewares
app.use(logReqRes)

// set up cors middlewares
app.use(cors(corsOptions));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


let dataBase: Db; // entire database
let noteCollection:any; // note collection in database
let userCollection:any; // user collection in database

// first connect to database & then only start the server
connectToDatabase((err) => {
    if (err) {
        console.log(err);
        throw new Error("Database Connection failed: " + err.message);
        // here you can email the administrator that database connection failed
    } else {
        dataBase = getDatabase();
        noteCollection = dataBase.collection("notes");
        userCollection = dataBase.collection("users");

        //---------- All Routes ----------------------
        app.use('/api/user', useRouter);
        app.use("/api/note", noteRouter);

        app.get('/', (req : Request, res : Response) => {
            res.json({
                hello: 'Hi there!',
            });
        });
        const port = process.env.PORT || 8000;
        app.listen(port, () => {
            console.log(`Server started at ${port}`);
        })
    }
})


export { dataBase, noteCollection , userCollection}