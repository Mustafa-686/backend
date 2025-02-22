// require('dotenv').config()
import dotenv from "dotenv";
import mongoose  from "mongoose";
import { DB_NAME } from "./constants.js";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
    path:'./env'
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`SERVER IS RUNNING AT PORT : ${process.env.PORT}`);
        
    })
})
.catch((Error)=>{
    console.log("MONGODB CONNECTION LOST !!", Error);
    
})