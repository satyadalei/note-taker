import dotenv from 'dotenv';
dotenv.config();

import express from "express"
import { logReqRes } from "./middlewares/reqreslogger"
import { connectToDatabase, getDatabase } from "./dbConnection"
import { Db } from 'mongodb';



const app = express();

// Global middlewares
app.use(express.urlencoded({ extended: true }));
app.use(logReqRes)

let DataBase: Db ;
// first connect to database & then only start the server
connectToDatabase((err) => {
    if (err) {
        console.log(err);
        throw new Error("Database Connection failed: " + err.message);
        // here you can email the administrator that database connection failed
    } else {
        const port = process.env.port || 8000;
        DataBase = getDatabase();
        app.listen(port, () => {
            console.log(`Server started at ${port}`);
        })
    }
})


app.get("/", (req, res) => {
    res.json({
        hello: "Hi there"
    })
})



export {DataBase}