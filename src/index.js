import express from "express";
import router from "./routes/routes.js";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Server it's alive at: http://localhost:${PORT}`);
});
