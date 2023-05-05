const express=require("express")
const connection=require("./config/db")
require("dotenv").config()
const cookieParser = require("cookie-parser")
const app=express()
app.use(express.json())


app.get("/",(req,res)=>{
    res.status(200).send({msg:"hello backend"})
})

app.listen(process.env.port, async()=>{
    await connection
    console.log("connected to DB")
})