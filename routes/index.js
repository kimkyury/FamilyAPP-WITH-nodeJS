const express = require("express");
const router = express.Router();
const path = require("path"); //html파일 연결을 위한 path모듈

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
