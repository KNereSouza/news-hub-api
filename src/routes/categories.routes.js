// Express router
import { Router } from "express";

// Middlewares
import validateCategoryData from "../middlewares/ValidateCategoryDataMiddleware.js";
import authenticateToken from "../middlewares/AuthMiddleware.js";
import checkRoles from "../middlewares/CheckRolesMiddleware.js";

// Controllers
import CreateCategoryController from "../controllers/CreateCategoryController.js";
import GetCategoriesController from "../controllers/GetCategoriesController.js";
import UpdateCategoryController from "../controllers/UpdateCategoryController.js";
import DeleteCategoryController from "../controllers/DeleteCategoryController.js";

const categoriesRouter = Router();

categoriesRouter.post(
  "/",
  authenticateToken,
  checkRoles(["admin"]),
  validateCategoryData,
  async (request, response) => {
    await new CreateCategoryController().handle(request, response);
  }
);

categoriesRouter.get("/{:slug}", async (request, response) => {
  await new GetCategoriesController().handle(request, response);
});

categoriesRouter.patch(
  "/:id",
  authenticateToken,
  checkRoles(["admin"]),
  async (request, response) => {
    await new UpdateCategoryController().handle(request, response);
  }
);

categoriesRouter.delete(
  "/:id",
  authenticateToken,
  checkRoles(["admin"]),
  async (request, response) => {
    await new DeleteCategoryController().handle(request, response);
  }
);

export default categoriesRouter;
