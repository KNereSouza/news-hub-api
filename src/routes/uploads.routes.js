import { Router } from "express";
import upload from "../config/multer.js";

import authenticateToken from "../middlewares/AuthMiddleware.js";
import validateFileType from "../middlewares/ValidateFileTypeMiddleware.js";
import checkRoles from "../middlewares/CheckRolesMiddleware.js";

import UploadImageController from "../controllers/UploadImageController.js";

const uploadsRouter = Router();

uploadsRouter.post(
  "/image",
  authenticateToken,
  checkRoles(["admin", "author"]),
  upload.single("file"),
  validateFileType,
  async (request, response) => {
    await new UploadImageController().handle(request, response);
  }
);

export default uploadsRouter;
