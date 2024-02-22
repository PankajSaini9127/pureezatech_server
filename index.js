const express = require("express");
const cors = require("cors");
 const db = require("./connection/db.js");

//.env file access
require('dotenv').config();

const PORT = process.env.port || 8080;

const app = express();

app.use(cors());

db();

app.use(express.json());

app.get("/",(req,res)=>{
    return res.send(`Server Start On Port No: ${PORT}`)
});

app.use('/auth',require('./route.js'));






app.listen(PORT, ()=>{
    console.log(`Server Is Listen on Port No:${PORT}`)
})