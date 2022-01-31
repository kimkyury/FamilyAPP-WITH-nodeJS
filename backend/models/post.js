module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', { // 테이블명 posts
        content: {
            type: DataTypes.TEXT, // 매우 긴 글
            allowNull: true,
        },
    }, {
        charset: 'utf8mb4',
        clloate: 'utf8mb4_general_ci',
    });
    Post.associate = (db) => {
        db.Post.belongsTo(db.User);
        db.Post.hasMany(db.Comment);
        db.Post.belongsTo(db.Image);
        db.Post.belongsTo(db.Folder);
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
    };
    return Post;
}