module.exports = (sequelize, DataTypes) => {
    const Schedule = sequelize.define('Schedule', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        start: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        end: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    Schedule.associate = (db) => {
        db.Schedule.belongsTo(db.User);
    };
    return Schedule;
}