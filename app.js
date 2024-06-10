const express = require("express");
const cookieParser = require("cookie-parser"); // 사용자 인증 미들웨어
const app = express();
const port = 9000;
// CORS
const cors = require("cors");
// env 파일
require('dotenv').config(); 
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

// 모든 요청에 대해 CORS 활성화
app.use(cors());
// CORS에 추가 옵션 설정 (선택 사항)
const corsOptions = {
    origin: '*', // 모든 도메인 허용
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // 자격 증명 허용
};
// 모든 요청에 대해 CORS 옵션 적용
app.use(cors(corsOptions));


app.use(express.json()); // JSON 형식의 요청 본문을 파싱(parsing)하기 위한 미들웨어를 설정
app.use(express.urlencoded({ extended: false })); // URL-encoded 형식의 요청 본문을 파싱하기 위한 미들웨어를 설정
app.use(cookieParser()); // 사용자인증
app.use("/api", [indexRouter]);


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
            url: 'http://52.78.70.9:9000',
            // url: 'http://localhost:9000',
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