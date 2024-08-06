module.exports = (sequelize, DataTypes) => {
    const Cast = sequelize.define('Cast', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      actor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Actors', // Nombre del modelo al que hace referencia
          key: 'id',
        },
      },
    }, {
      timestamps: false,
    });
    return Cast;
  };