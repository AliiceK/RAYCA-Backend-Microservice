const mongoose = require("mongoose");


const connectDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.log("Error connecting to Database" + error.message);
        process.exit(1);
    }
};

module.exports = connectDatabase;