module.exports = (sequelize, DataTypes) => {
    const Cast = sequelize.define (
        'cast',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        movie_serie_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            foreignKey: true,
        },
        actor_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            foreignKey:true,
        },
    },
    );
    return Cast;
};