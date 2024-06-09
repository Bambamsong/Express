const mongoose = require("mongoose");

/**  DB.User: 닉네임, 비밀번호  **/
const userSchema = new mongoose.Schema({
    nickname :{
        type: String,
        required: true,
        unique: true,
    },
    password : {
        type: String,
        required: true,
        unique: true,
    },
})

module.exports = mongoose.model("User", userSchema);