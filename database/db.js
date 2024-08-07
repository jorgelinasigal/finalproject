const { Sequelize } = require('sequelize');
const { database } = require("../config");

// ENVIRONMENT
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  database.DB_NAME,
  database.DB_USER,
  database.DB_PASSWORD,
  {
    host: database.DB_HOST,
    dialect: database.dialect,
  }
);

async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

async function closeConnection() {
  try {
    await sequelize.close();
    console.log("Connection closed.");
  } catch (error) {
    console.error("Unable to close the connection to the database:", error);
  }
}

module.exports = { sequelize, authenticate, closeConnection };
