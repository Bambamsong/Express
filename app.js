const express = require("express");
const cookieParser = require("cookie-parser"); // 사용자 인증 미들웨어
const app = express();
const port = 9000;

// 스웨거
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// DB 연결
const connect = require("./schemas");
connect();
// Router
// const userRouter = require("./routes/users"); // 회원가입
// const authRouter = require("./routes/auth"); // 로그인
// const postRouter = require("./routes/posts") // 게시글
// const commentRouter = require("./routes/comments"); // 댓글
const indexRouter = require("./routes/index");

app.use(express.json()); // JSON 형식의 요청 본문을 파싱(parsing)하기 위한 미들웨어를 설정
app.use(express.urlencoded({ extended: false })); // URL-encoded 형식의 요청 본문을 파싱하기 위한 미들웨어를 설정
app.use(cookieParser()); // 사용자인증
// app.use("/api", [userRouter, authRouter, postRouter, commentRouter]);
app.use("/api", [indexRouter]);

// app.get('/', (req, res) => {
//     res.send("Hello Jinyong!");
// })

app.listen(port, () => {
    console.log(port, "Server is running!");
});



// Swagger 설정
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API with Swagger',
        version: '1.0.0',
        description: 'A simple CRUD API application with Express and documented with Swagger',
    },
    servers: [
        {
            url: 'localhost:9000',
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['./routes/swagger.js'], // API 경로
};

const swaggerSpec = swaggerJsdoc(options);

// Swagger UI 설정
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));