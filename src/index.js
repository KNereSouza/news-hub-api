import express from "express";
import router from "./routes/routes.js";
import { configDotenv } from "dotenv";
import {
  authenticateToDatabase,
  syncDatabaseModels,
} from "./config/database.js";

configDotenv();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server it's alive at: http://localhost:${PORT}`);
});

authenticateToDatabase();

import User from "./models/User.js";

syncDatabaseModels();
