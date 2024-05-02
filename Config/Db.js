const mongoose = require('mongoose');
mongoose.set("strictQuery", false);
require('dotenv').config();

const MongoConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Successfully connected to : ${mongoose.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = MongoConnect;
