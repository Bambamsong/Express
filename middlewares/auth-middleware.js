require('dotenv').config(); // env 파일 쓰기 위한 조건
const jwt = require("jsonwebtoken");
const User = require("../schemas/user");

/** 사용자 인증 미들웨어 **/
module.exports = async (req, res, next) => {
    const { Authorization } = req.cookies;
    const [authType, authToken] = (Authorization ?? "").split(" "); // 띄어쓰기 기준으로 암호화 타입과 토큰 구별

    if (!authToken || authType !=="Bearer") {
        return res.status(401).send({ errorMessage : "로그인 후 이용 가능한 기능입니다."});
    }
    try {
        const { nickname } =jwt.verify(authToken, process.env.SECRETKEY);
        res.locals.nickname = nickname;
        next();
    } 
    catch(err) {
        console.log(err);
        res.status(401).send({ errorMessage : "로그인 후 이용 가능한 기능입니다."})
    }
};