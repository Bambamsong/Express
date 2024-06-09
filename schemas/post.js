const mongoose = require("mongoose");

const postsSchema = new mongoose.Schema({
    title: {// 제목
        type: String,
        required: true,
    },
    userId: {// 작성자명

    },
    password: {// 비밀번호

    },
    content: {// 본문

    },
});

module.exports = mongoose.model("Posts", postsSchema);