module.exports = (sequelize, DataTypes) => {
    const Chat = sequelize.define('Chat', {
        message: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 한글 저장됨
    });
    Chat.associate = (db) => {
        db.Chat.belongsTo(db.User);
    };
    return Chat;
}