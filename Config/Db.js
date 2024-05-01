require('dotenv').config()
const mongoose = require("mongoose");


async function MongoConnect(){
    mongoose.connect(process.env.MONGO_CONNECT)
    .then(() => {console.log("Mongoose connect Succesfully!");
  });
}

module.exports =MongoConnect