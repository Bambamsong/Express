const mongoose = require("mongoose");

/**  DB.Comment: 제목, 작성자명, 작성날짜, 본문 **/
const commentSchema = new mongoose.Schema({
    nickname: {// 작성자명
        type: String,
        required: true
    },
    date: {// 작성날짜
        type: Date,
        required: true,
        default: Date.now
    },
    comment: {// 본문
        type: String,
        required: true
    },
    postId: {
        type : mongoose.Schema.Types.ObjectId, 
        ref: "Post", 
        required: true
    }
});

module.exports = mongoose.model("Comment", commentSchema);