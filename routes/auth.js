require('dotenv').config(); // env 파일 쓰기 위한 조건
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../schemas/user");

router.post("/login", async (req, res) => {
    const { nickname, password } = req.body;
    const user = await User.findOne({ nickname });
    if (!user || password !== user.password) {
        return res.status(400).json({ errorMessage : "닉네임 또는 패스워드가 올바르지 않습니다." });
    }

    try {
        const token = jwt.sign({ nickname }, process.env.SECRETKEY , { expiresIn : "10m" });
        console.log(`${user.nickname} login complete`);

        res.cookie("Authorization", `Bearer ${token}`); // JWT를 쿠키에 담아서 할당
        res.status(200).json({token, result : "success"}); // JWT를 BODY로 할당!
      } 
    catch (err) {
        console.error(err);
        res.status(400).json({errorMessage: "login fail"});
      }
})

module.exports = router;
