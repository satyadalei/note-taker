import express from "express"
const app = express();

const port = process.env.port || 8000;


app.get("/",(req,res)=>{
    res.json({
        hello : "Hi there"
    })
})


app.listen(port, ()=>{
    console.log(`Server started at ${port}`);
})