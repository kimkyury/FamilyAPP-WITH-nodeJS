const express = require("express");
const router = express.Router();
const path = require("path"); //html파일 연결을 위한 path모듈

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

module.exports = router;
