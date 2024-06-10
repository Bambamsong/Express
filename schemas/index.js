// DB 연결
const mongoose = require("mongoose");

require('dotenv').config();
const DB_URL = process.env.DATABASE_URL

const connect = () => {
    mongoose
    .set("strictQuery", true)
    .connect("mongodb://localhost:27017/Diary")
    // .connect(DB_URL)
    .catch((err) => console.log(err));
};

mongoose.connection.on("error", err => {
    console.error("몽고디비 연결 에러", err);
});

module.exports = connect;