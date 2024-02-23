const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const url = process.env.DB_URL;

async function db(){
    try {
       await mongoose.connect(url,{ dbName: "purezzaTech"});
       console.log('Database Connected Successfuly')
    } catch (error) {
        console.log("Error while connect Database",error)
    }
  
}
module.exports = db