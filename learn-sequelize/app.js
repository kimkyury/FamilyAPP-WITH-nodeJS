const express = require("express");
const path = require("path");
const morgan = require("morgan");
const nunjucks = require("nunjucks");

/* sequelize와 sync메서드를 통해 서버 실행 시 MySQL와 연동 */
const { sequelize } = require("./models"); // require('./models/index.js')와 같음, 폴더 내 index.js파일은 require시 이름 생략 가능
const indexRouter = require("./routes");
const userRouter = require("./routes/users");
const commentsRouter = require("./routes/comments");

const app = express();
app.set("port", 3001); //app.set("port", process.env.PORT || 3001);
app.set("view engine", "html");

nunjucks.configure("views", {
  express: app,
  watch: true,
});
sequelize
  .sync({ force: false }) // true로 설정시, 서버 실행 시마다 테이블을 재생성함. 테이블 잘 못 만들었으면 true로 하기.
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/".indexRouter);
app.use("/users", usersRouter);
app.use("/comments", commentsRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url}라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
