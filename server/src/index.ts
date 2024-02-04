import dotenv from 'dotenv';
dotenv.config();

import express from "express"
import { logReqRes } from "./middlewares/reqreslogger"
import { connectToDatabase, getDatabase } from "./dbConnection"
import { Db } from 'mongodb';
import useRouter from "./routes/user"
import bodyParser from "body-parser"
import noteRouter from "./routes/note"

const app = express();

// Global middlewares
app.use(logReqRes)
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


let dataBase: Db;
let noteCollection:any;
let userCollection:any;

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

        app.get('/', (req, res) => {
            res.json({
                hello: 'Hi there',
            });
        });
        const port = process.env.PORT || 8000;
        app.listen(port, () => {
            console.log(`Server started at ${port}`);
        })
        // console.log(dataBase);

    }
})



// app.get("/", (req, res) => {
//     res.json({
//         hello: "Hi there"
//     })
// })

// //---------- All Routes ----------------------
// app.use("/api/user", useRouter);



export { dataBase, noteCollection , userCollection}