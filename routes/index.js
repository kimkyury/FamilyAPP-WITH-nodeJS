const Sequlize = require('sequelize');
const User = require('./user');
const Comment = require(./coment');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];

const sequelize = new Sequilize(config.database, config.username, config.password);


const express = require("express");
const router = express.Router();
const path = require("path"); //html파일 연결을 위한 path모듈

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

module.exports = router;
