module.exports  = (sequelize, DataTypes) => {
    const Genre = sequelize.define (
        'genre',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true, 
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    );
    return Genre;
};