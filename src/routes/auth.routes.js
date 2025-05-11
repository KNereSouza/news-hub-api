import { Router } from "express";
import AuthController from "../controllers/AuthController.js";

const authRouter = Router();

authRouter.post("/login", async (request, response) => {
  await AuthController.login(request, response);
});

export default authRouter;
