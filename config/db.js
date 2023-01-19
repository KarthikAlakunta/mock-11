require("dotenv").config();
const mongoose = require("mongoose");
const DBURL = process.env.DBURL || "mongodb+srv://mongo:mongo@cluster0.hs9jwwy.mongodb.net/mock?retryWrites=true&w=majority";
const connect  = async() => {
    return await mongoose.connect(DBURL);
}

module.exports = connect;