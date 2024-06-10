const express = require("express");
const router = express.Router();

// Router
const userRouter = require("./users"); // 회원가입
const authRouter = require("./auth"); // 로그인
const postRouter = require("./posts") // 게시글
const commentRouter = require("./comments"); // 댓글


// 루트 경로
router.get('/', (req, res) => {
    res.send("Hello Jinyong!"); 
})

router.use("/post", postRouter);
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/comment", commentRouter);

module.exports = router;