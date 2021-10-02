const express = require("express"); //서버역할
const path = require("path"); //html파일 연결을 위한 path모듈

const app = express();
app.set("port", process.env.PORT || 3000); // 서버가 실행될 포트 설정

app.get("/", (req, res) => {
  // 기본 주소에 GET요청시 동작 설정
  //res.send('WITH-Sever-Ofen') // express에선 res.write, res.end대신 res.send를 사용
  res.sendFile(path.join(__dirname, "/index.html")); //html파일 연결을 위한 sendFile함수
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
