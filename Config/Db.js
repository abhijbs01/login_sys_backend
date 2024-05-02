const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
require('dotenv').config();

const MongoConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT);
        console.log(`Successfully connected to : ${mongoose.connection.host}`);
    } catch (error) {
        console.error(error);
    }
};

module.exports = MongoConnect;
    