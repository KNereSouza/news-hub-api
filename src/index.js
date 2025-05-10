import express from "express";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get("/", (request, response) => {
  response.send({ message: "Hello World! Everything's okay" });
});

app.listen(PORT, () => {
  console.log(`Server it's alive at: http://localhost:${PORT}`);
});
