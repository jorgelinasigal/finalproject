module.exports = (sequelize, DataTypes) => {
  const Actor = sequelize.define(
    "Actor",
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
    {
      tableName: "actors",
      timestamps: false
    }
  );

  Actor.associate = (models) => {
    // Un actor puede aparecer en muchos contenidos y viceversa
    Actor.belongsToMany(models.Content, {
      through: 'Cast',
      as: 'contents',
      foreignKey: 'actor_id',
    });
  };

  return Actor;
};
