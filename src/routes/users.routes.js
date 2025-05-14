// Express Router
import { Router } from "express";

// Middlewares
import authenticateToken from "../middlewares/AuthMiddleware.js";
import checkRoles from "../middlewares/CheckRolesMiddleware.js";
import validateUserData from "../middlewares/ValidateUserDataMiddleware.js";

// Controllers
import CreateUserController from "../controllers/CreateUserController.js";

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

export default usersRouter;
