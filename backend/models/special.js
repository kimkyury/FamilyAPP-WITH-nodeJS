module.exports = (sequelize, DataTypes) => {
    const Special = sequelize.define('Special', {
        content: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 한글 저장됨
    });
    Special.associate = (db) => {
        db.Special.belongsTo(db.User);
    };
    return Special;
}