const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.z6wdoyp.mongodb.net/?retryWrites=true&w=majority`

async function db(){
    try {
       await mongoose.connect(url,{useUnifiedTopology:true});
       console.log('Database Connected Successfuly')
    } catch (error) {
        console.log("Error while connect Database",error)
    }
  
}
module.exports = db