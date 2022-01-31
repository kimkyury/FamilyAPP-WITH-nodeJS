module.exports = (sequelize, DataTypes) => {
    const Folder = sequelize.define('Folder', {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci'
    });
    Folder.associate = (db) => {
        db.Folder.hasMany(db.Post);
    }
    return Folder;
}