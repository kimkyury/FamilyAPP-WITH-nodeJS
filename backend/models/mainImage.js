module.exports = (sequelize, DataTypes) => {
    const MainImage = sequelize.define('MainImage', {
        src: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    return MainImage;
}