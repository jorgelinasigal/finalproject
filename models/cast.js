module.exports = (sequelize, DataTypes) => {
  const Cast = sequelize.define(
    "Cast",
    {
      content_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'contents',
          key: 'id'
        },
        allowNull: false,
      },
      actor_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'actors',
          key: 'id'
        },
        allowNull: false,
      },
    },
    {
      tableName: "cast", // Nombre de la tabla en la base de datos
      timestamps: false
    }
  );

  return Cast;
};
