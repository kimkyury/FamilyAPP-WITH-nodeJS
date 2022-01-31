const env = process.env.NODE_ENV || 'development';
const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

const sequelize = new Sequelize(
    config.database, 
    config.username, 
    config.password, 
    config
);

db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);
db.Image = require('./image')(sequelize, Sequelize);
db.Schedule = require('./schedule')(sequelize, Sequelize);
db.Folder = require('./folder')(sequelize, Sequelize);
db.Chat = require('./chat')(sequelize, Sequelize);
db.Special = require('./special')(sequelize, Sequelize);
db.MainImage = require('./mainImage')(sequelize, Sequelize);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;