const express = require("express"); //서버역할

const app = express();
app.set("port", process.env.PORT || 3000); // 서버가 실행될 포트 설정

app.get("/", (req, res) => {
  // 기본 주소에 GET요청시 동작 설정
  res.send("FamilyApp-WITH"); // express에선 res.write, res.end대신 res.send를 사용
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
