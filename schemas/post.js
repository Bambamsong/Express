const mongoose = require("mongoose");

/**  DB.Post: 제목, 작성자명, 작성날짜, 본문 **/
const postsSchema = new mongoose.Schema({
    title: {// 제목
        type: String,
        required: true,
    },
    nickname: {// 작성자명
        type: String,
        required: true
    },
    date: {// 작성날짜
        type: Date,
        required: true
    },
    content: {// 본문
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Post", postsSchema);