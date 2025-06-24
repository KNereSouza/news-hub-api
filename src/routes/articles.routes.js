// Express router
import { Router } from "express";

// Middlewares
import validateArticleData from "../middlewares/ValidateArticleDataMiddleware.js";
import authenticateToken from "../middlewares/AuthMiddleware.js";
import checkRoles from "../middlewares/CheckRolesMiddleware.js";
import CreateArticleController from "../controllers/CreateArticleController.js";

// Controllers

const articlesRouter = Router();

articlesRouter.post(
  "/",
  authenticateToken,
  checkRoles(["author"]),
  validateArticleData,
  async (request, response) => {
    await new CreateArticleController().handle(request, response);
  }
);

export default articlesRouter;
