// Express router
import { Router } from "express";

// Middlewares
import validateArticleData from "../middlewares/ValidateArticleDataMiddleware.js";
import authenticateToken from "../middlewares/AuthMiddleware.js";
import checkRoles from "../middlewares/CheckRolesMiddleware.js";
import isOwner from "../middlewares/IsOwnerMiddleware.js";

// Controllers
import CreateArticleController from "../controllers/CreateArticleController.js";
import GetArticlesController from "../controllers/GetArticlesController.js";
import UpdateArticlesController from "../controllers/UpdateArticleController.js";

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

articlesRouter.patch(
  "/:id",
  authenticateToken,
  isOwner(["admin", "editor"]),
  async (request, response) => {
    await new UpdateArticlesController().handle(request, response);
  }
);

export default articlesRouter;
