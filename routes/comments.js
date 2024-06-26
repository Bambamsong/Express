const express = require("express")
const authMiddleware = require("../middlewares/auth-middleware");
const commentSchema = require("../schemas/comment");
const postSchema = require("../schemas/post");
const router = express.Router();


/** 댓글 조회 API **/
router.get("/:postId", async(req, res) => {
    const { postId } = req.params;
    const getComment = await commentSchema.find({postId : postId});
    if (!getComment) {
        return res.status(404).json({ errorMessage : "게시글이 존재하지 않습니다."})
    }
    res.status(200).json({ comment : getComment, result : "success" });
})
/** 댓글 작성 API **/
router.post("/:postId", authMiddleware, async (req, res) => {
    const { postId } = req.params;
    const { comment } = req.body;
    
    const nickname = res.locals.nickname;

    // findOne 메서드 사용 및 null 확인
    const existPost = await postSchema.findOne({_id : postId});
    if (!existPost) { // existPost가 null이면 (게시물이 없으면)
        return res.status(400).json({ errorMessage : "잘못된 요청(존재하지 않는 게시물)"});
    }

    if (!comment) {
        console.error("댓글이 입력되지 않았습니다.");
        return res.status(400).json({ errorMessage : "댓글 내용을 입력해주세요."});
    }

    const postComment = await commentSchema.create({ nickname, comment, postId, date: new Date().toISOString()});
    console.log("댓글 작성 완료");
    res.status(200).json({ comment : postComment, result : "success"});
});

/** 댓글 수정 API **/
router.patch("/:commentId", authMiddleware, async (req, res) => {
    const { commentId } = req.params;
    const { comment } = req.body;
    const nickname = res.locals.nickname;
    if (!comment) {
        return res.status(400).json({ errorMessage : "댓글 내용을 입력해주세요." });
    };
    // const existComment = await commentSchema.findOne({nickname, _id : commentId});
    // if (!existComment) {
    //     return res.status(400).json({ errorMessage : "당신의 댓글이 아닙니다." });
    // }
    const updateComment = await commentSchema.updateOne({nickname, _id : commentId}, {$set : {comment}});
    if (updateComment.modifiedCount === 0 ){
        return res.status(400).json({ errorMessage : "댓글을 찾을 수 없거나 수정 권한이 없습니다."});
    };
    res.status(200).json({result : "success"});
})

/** 댓글 삭제 API **/
router.delete("/:commentId", authMiddleware, async (req, res) => {
    const { commentId } = req.params;
    const nickname = res.locals.nickname;
    // const nickname = "jinyong1";

    const existComment = await commentSchema.findOne({_id : commentId, nickname : nickname});
    if (!existComment) {
        return res.status(400).json({ errorMessage : "수정 권한이 없습니다."});
    }
    else{
        await commentSchema.deleteOne({_id : commentId});
        console.log(`${nickname} 의 ${commentId} 댓글이 삭제되었습니다.`)
        res.json({result : "삭제 완료!"})
    };
});

module.exports = router;

