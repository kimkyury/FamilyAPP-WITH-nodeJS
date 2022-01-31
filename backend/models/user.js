module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true, // 중복금지
        },
        nickname: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        birth: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        color: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 한글 저장됨
    });
    User.associate = (db) => {
        db.User.hasMany(db.Post);
        db.User.hasMany(db.Comment);
        db.User.hasMany(db.Schedule);
        db.User.hasMany(db.Chat);
        db.User.hasMany(db.Special);
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' });
    };
    return User;
}