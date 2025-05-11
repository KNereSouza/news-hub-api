import { Router } from "express";
import authRouter from "./auth.routes.js";

const router = Router();

router.get("/", (request, response) => {
  response.send({ message: "Hello World! Everything's okay" });
});

router.use("/auth", authRouter);

export default router;
