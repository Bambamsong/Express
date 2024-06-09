const express = require("express");
const router = express.Router();

const postSchema = require("../schemas/post");
const authMiddleware = require("../middlewares/auth-middleware");

/** 전체 게시글 목록 조회 API **/
router.get("/diary", async (req, res) => {
    try {
        console.log("전체 게시글 조회 시작");
        const posts = await postSchema
            .find({}, { title: 1, nickname: 1, date: 1, _id: 1 })
            .sort("-date"); // 작성날짜 기준 내림차순 정렬
        console.log("전체 게시글 조회 성공");

        // 성공적인 응답
        res.json({ data: posts, result: "success" });
    } catch (error) {
        // 에러 처리
        console.error("전체 게시글 조회 실패:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/** 게시글 작성 API **/
router.post("/diary/post", authMiddleware, async(req, res) => {
    const { title, content } = req.body;
    const nickname = res.locals.nickname;

    if (!title || !content) {
        return res.status(400).json({ errorMessage : "제목 또는 본문을 입력해주세요."});
    }

    try {
        const post = { title, content, nickname, date: new Date().toISOString()};
        const realPost = await postSchema.create(post);
        return res.status(200).json({post, result: "success"});
    }
    catch (err) {
        console.error(err);
        res.status(502).json({errorMessage: "게시글 작성 실패"});
    }
});

/** 게시글 조회 API **/
router.get("/diary/:postId", async (req, res) => {
    // const nickname = res.locals.nickname;
    const { postId } = req.params;
    const findPost = await postSchema.find({_id : postId});
    if (!findPost.length) {
        return res.status(400).json({ errorMessage : "게시글 없음"});
    }
    console.log("조회 성공!");
    res.status(200).json({ post : findPost, result : "success"});
})
module.exports = router;