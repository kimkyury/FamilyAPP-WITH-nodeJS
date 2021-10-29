const express = require("express"); //서버역할
const morgan = require("morgan");
const path = require("path"); //html파일 연결을 위한 path모듈
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
// const nunjucks = require("nunjucks"); //nun

dotenv.config();
const indexRouter = require("./routes"); //router 설정
const userRouter = require("./routes/user"); // userRouter 섲렁
const { dirname } = require("path");
const app = express();

app.set("port", process.env.PORT || 3000); // 서버가 실행될 포트 설정
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
// app.set("view engine", "html");

/*
nunjucks.configure("views", {
  express: app,
  watch: true,
});
*/

app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "pulic")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false, // 요청이 올 때 세션에 수정 사항이 생기지 않더라도 세션을 다시 저장할지 설정
    saveUninitialized: false, // 세션에 대한 내역이 없더라도 처음부터 세션을 생성할지 설정
    secret: process.env.COOKIE_SECRET,
    cookie: {
      // 세션 쿠키 설정
      httpOnly: true, // true: 클라이언트에서 쿠키를 확인하지 못하게함
      secure: false, // false: https가 아닌 환경에서도 사용가능하도록 함 (배포시 http를 적용 권장, secure도 true설정 적용 권장)
    },
    name: "session-cookie",
  })
);

app.use("/", indexRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
  /* 404 발생시 아래 문구를 출력 */
  const error = new Error(`${req.mothod} ${req.url} 라우터가 없어요`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  /* 에러 처리 미들웨어 */
  res.locals.message = err.message; // err란 템플릿파일을 렌더링 -> 렌더링 시 message와 error에 넣어준 값을 함께 렌더링
  res.locals.rror = process.env.NODE_ENV !== "production" ? err : {}; // 시스템 환경이 production(배포환경)이 아닐 때만 표시
  res.status(err.status || 500);
  res.render("error");
});

app.get("/", (req, res) => {});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
