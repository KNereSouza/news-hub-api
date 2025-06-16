// Express Router
import { Router } from "express";

// Middlewares
import authenticateToken from "../middlewares/AuthMiddleware.js";
import checkRoles from "../middlewares/CheckRolesMiddleware.js";
import validateUserData from "../middlewares/ValidateUserDataMiddleware.js";

// Controllers
import CreateUserController from "../controllers/CreateUserController.js";
import GetUsersController from "../controllers/GetUsersController.js";
import UpdateUserController from "../controllers/UpdateUserController.js";

const usersRouter = Router();

usersRouter.post(
  "/",
  authenticateToken,
  validateUserData,
  checkRoles(["admin"]),
  async (request, response) => {
    await new CreateUserController().handle(request, response);
  }
);

usersRouter.get("/", async (request, response) => {
  await new GetUsersController().handle(request, response);
});

usersRouter.patch(
  "/:id",
  authenticateToken,
  checkRoles(["admin"]),
  async (request, response) => {
    await new UpdateUserController().handle(request, response);
  }
);

export default usersRouter;
