const express = require("express");
const router = express.Router();
const User = require("../schemas/user");

/** 회원가입 API **/
function isValidNickname(nickname) {
    const regex = /^[a-zA-Z0-9]{3,}$/; // 닉네임이 알파벳 대소문자와 숫자로만 구성되어 있고, 최소 3자 이상이어야 한다는 조건을 만족하는 정규 표현식
    return regex.test(nickname);
}

function isValidPassword(password, nickname, confirmPassword) {
    if (password.length < 4) return "비밀번호는 4글자 이상이어야 합니다."
    if (password.includes(nickname)) return "비밀번호에 닉네임이 존재합니다."
    return null; // 모든 조건에 부합
}

router.post("/users", async (req, res) => {
    const { nickname, password, confirmPassword } = req.body;

    // 닉네임 조건
    if (!isValidNickname(nickname)){
        return res.status(400).json({ errorMessage : "닉네임은 최소 3글자 이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)로 구성되어야 합니다."});
    }
    const existUser = await User.findOne({nickname});
    if (existUser) {
        return res.status(400).json({errorMessage : "중복된 닉네임 입니다."});
    }
    // 비밀번호 조건
    const passwordValidation = isValidPassword(password, nickname, confirmPassword);
    if (passwordValidation !== null) {
        return res.status(400).json({ errorMessage : passwordValidation});
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ errorMessage : "비밀번호 확인이 일치하지 않습니다."});
    }
    // 모든 조건을 통과하면 DB에 데이터 추가하기
    const user = new User({ nickname, password }); // password 확인은 굳이 넣을 필요없음
    await user.save();

    res.status(201).json({ message : "회원가입 성공"})
})
module.exports = router;