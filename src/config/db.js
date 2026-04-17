const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/advanced-routing-queries');
        console.log("Connected to MongoDB successfully");
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;