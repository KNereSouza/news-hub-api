// Express router
import { Router } from "express";

// Middlewares
import validateArticleData from "../middlewares/ValidateArticleDataMiddleware.js";
import authenticateToken from "../middlewares/AuthMiddleware.js";
import checkRoles from "../middlewares/CheckRolesMiddleware.js";

// Controllers
import CreateArticleController from "../controllers/CreateArticleController.js";
import GetArticlesController from "../controllers/GetArticlesController.js";

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

articlesRouter.get("/:slug", async (request, response) => {
  await new GetArticlesController().handle(request, response);
});

articlesRouter.get("/", async (request, response) => {
  await new GetArticlesController().handle(request, response);
});

export default articlesRouter;
