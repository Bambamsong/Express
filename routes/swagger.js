/**
 * @swagger
 * /login:
 *   post:
 *     summary: 사용자 로그인
 *     description: nickname과 password를 이용하여 로그인하고 JWT 토큰을 발급받습니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 description: 사용자 닉네임
 *               password:
 *                 type: string
 *                 description: 사용자 비밀번호
 *     responses:
 *       200:
 *         description: 로그인 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT 토큰
 *                 result:
 *                   type: string
 *                   description: 성공 여부 ("success")
 *       400:
 *         description: 로그인 실패 (닉네임 또는 비밀번호 오류)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   description: 오류 메시지
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: 댓글 ID
 *         nickname:
 *           type: string
 *           description: 작성자 닉네임
 *         comment:
 *           type: string
 *           description: 댓글 내용
 *         postId:
 *           type: string
 *           description: 게시글 ID
 *         date:
 *           type: string
 *           format: date-time
 *           description: 작성 날짜 및 시간 (ISO 8601 형식)
 */

/**
 * @swagger
 * /{postId}:
 *   get:
 *     summary: 댓글 조회
 *     description: 특정 게시글의 댓글 목록을 조회합니다.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: 게시글 ID
 *     responses:
 *       200:
 *         description: 댓글 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *                 result:
 *                   type: string
 *                   description: 성공 여부 ("success")
 *       404:
 *         description: 게시글이 존재하지 않음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   description: 오류 메시지
 */
/**
 * @swagger
 * /{postId}:
 *   post:
 *     summary: 댓글 작성
 *     description: 특정 게시글에 댓글을 작성합니다.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: 게시글 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: 댓글 내용
 *     responses:
 *       200:
 *         description: 댓글 작성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   $ref: '#/components/schemas/Comment'
 *                 result:
 *                   type: string
 *                   description: 성공 여부 ("success")
 *       400:
 *         description: 잘못된 요청 또는 댓글 내용 누락
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   description: 오류 메시지
 */
/**
 * @swagger
 * /{commentId}:
 *   patch:
 *     summary: 댓글 수정
 *     description: 특정 댓글을 수정합니다.
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: 댓글 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 description: 수정할 댓글 내용
 *     responses:
 *       200:
 *         description: 댓글 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: 성공 여부 ("success")
 *       400:
 *         description: 댓글을 찾을 수 없거나 수정 권한이 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   description: 오류 메시지
 *     security:
 *       - bearerAuth: [] 
 */
/**
 * @swagger
 * /{commentId}:
 *   delete:
 *     summary: 댓글 삭제
 *     description: 특정 댓글을 삭제합니다.
 *     parameters:
 *       - in: path
 *         name: commentId
 *         required: true
 *         schema:
 *           type: string
 *         description: 댓글 ID
 *     responses:
 *       200:
 *         description: 댓글 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: 성공 여부 ("삭제 완료!")
 *       400:
 *         description: 수정 권한이 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   description: 오류 메시지
 *     security:
 *       - bearerAuth: [] 
 */
/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: 게시글 ID
 *         title:
 *           type: string
 *           description: 게시글 제목
 *         nickname:
 *           type: string
 *           description: 작성자 닉네임
 *         content:
 *           type: string
 *           description: 게시글 내용
 *         date:
 *           type: string
 *           format: date-time
 *           description: 작성 날짜 및 시간 (ISO 8601 형식)
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: 전체 게시글 목록 조회
 *     description: 전체 게시글 목록을 작성 날짜 내림차순으로 조회합니다.
 *     responses:
 *       200:
 *         description: 게시글 목록 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *                 result:
 *                   type: string
 *                   description: 성공 여부 ("success")
 *       500:
 *         description: 서버 오류
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: 오류 메시지
 */
/**
 * @swagger
 * /:
 *   post:
 *     summary: 게시글 작성
 *     description: 새로운 게시글을 작성합니다. (인증 필요)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: 게시글 제목
 *               content:
 *                 type: string
 *                 description: 게시글 내용
 *     responses:
 *       200:
 *         description: 게시글 작성 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *                 result:
 *                   type: string
 *                   description: 성공 여부 ("success")
 *       400:
 *         description: 제목 또는 내용 누락
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   description: 오류 메시지
 *       502:
 *         description: 게시글 작성 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   description: 오류 메시지
 */
/**
 * @swagger
 * /{postId}:
 *   get:
 *     summary: 게시글 조회
 *     description: 특정 게시글을 ID로 조회합니다.
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: 게시글 ID
 *     responses:
 *       200:
 *         description: 게시글 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *                 result:
 *                   type: string
 *                   description: 성공 여부 ("success")
 *       400:
 *         description: 게시글이 존재하지 않음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   description: 오류 메시지
 */
/**
 * @swagger
 * /{postId}:
 *   patch:
 *     summary: 게시글 수정
 *     description: 특정 게시글을 수정합니다. (인증 필요)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: 게시글 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: 수정할 게시글 제목
 *               content:
 *                 type: string
 *                 description: 수정할 게시글 내용
 *     responses:
 *       200:
 *         description: 게시글 수정 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 성공 메시지 ("수정완료")
 *       400:
 *         description: 게시글을 찾을 수 없거나 수정 권한이 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   description: 오류 메시지
 */
/**
 * @swagger
 * /{postId}:
 *   delete:
 *     summary: 게시글 삭제
 *     description: 특정 게시글을 삭제합니다. (인증 필요)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *         description: 게시글 ID
 *     responses:
 *       200:
 *         description: 게시글 삭제 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: 성공 여부 ("삭제 완료!")
 *       400:
 *         description: 게시글을 찾을 수 없거나 삭제 권한이 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   description: 오류 메시지
 */
/**
 * @swagger
 * /:
 *   post:
 *     summary: 회원가입
 *     description: 사용자 회원가입
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nickname:
 *                 type: string
 *                 description: 사용자 닉네임 (최소 3자 이상, 알파벳 대소문자, 숫자)
 *               password:
 *                 type: string
 *                 description: 사용자 비밀번호 (4자 이상, 닉네임 포함 불가)
 *               confirmPassword:
 *                 type: string
 *                 description: 비밀번호 확인
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: 성공 메시지 ("회원가입 성공")
 *       400:
 *         description: 회원가입 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   description: 오류 메시지 (닉네임 중복, 비밀번호 조건 불일치 등)
 */