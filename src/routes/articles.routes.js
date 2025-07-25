// Express router
import { Router } from "express";

// Middlewares
import validateArticleData from "../middlewares/ValidateArticleDataMiddleware.js";
import authenticateToken from "../middlewares/AuthMiddleware.js";
import optionalAuthMiddleware from "../middlewares/OptionalAuthMiddleware.js";
import checkRoles from "../middlewares/CheckRolesMiddleware.js";
import isOwner from "../middlewares/IsOwnerMiddleware.js";

// Controllers
import CreateArticleController from "../controllers/CreateArticleController.js";
import GetArticlesController from "../controllers/GetArticlesController.js";
import UpdateArticlesController from "../controllers/UpdateArticleController.js";
import DeleteArticleController from "../controllers/DeleteArticleController.js";

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

articlesRouter.get(
  "/:slug",
  optionalAuthMiddleware,
  async (request, response) => {
    await new GetArticlesController().handle(request, response);
  }
);

articlesRouter.get("/", optionalAuthMiddleware, async (request, response) => {
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

articlesRouter.delete(
  "/:id",
  authenticateToken,
  checkRoles(["admin"]),
  async (request, response) => {
    await new DeleteArticleController().handle(request, response);
  }
);

export default articlesRouter;
