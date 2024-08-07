module.exports = {
  database: {
    DB_NAME: process.env.DB_NAME || "trailerflix_db",
    DB_USER: process.env.DB_USER || "root",
    DB_PASSWORD: process.env.DB_PASSWORD || "pasco961",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: process.env.DB_PORT || 3306,
    dialect: "mysql",
  },
  PORT: 3008,
  define: {
    timestamps: false, // Desactiva createdAt y updatedAt para todos los modelos
  },
};
