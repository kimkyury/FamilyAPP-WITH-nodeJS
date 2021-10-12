const Sequelize = require("sequelize");
const User = require("./user");
const Comment = require("./comment");

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
db.sequelize = sequelize;

db.User = User;
db.Comment = Comment;

User.init(sequelize); //init가 실행되어야 테이블이 모델로 연결 됨
Comment.init(sequelize);

User.associate(db);
Comment.associate(db);

module.exports = db;
