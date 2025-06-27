import { Sequelize } from "sequelize";
import { configDotenv } from "dotenv";

configDotenv();

const dbName = process.env.DB_NAME;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
  dialect: "postgres",
  host: dbHost,
  logging: (...msg) => console.log(msg),
});

const authenticateToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const syncDatabaseModels = async () => {
  try {
    await sequelize.sync({ force: false, logging: false });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing models:", error);
  }
};

export { sequelize, authenticateToDatabase, syncDatabaseModels };
