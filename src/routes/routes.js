import { Router } from "express";

// Import all Routers
import authRouter from "./auth.routes.js";
import usersRouter from "./users.routes.js";
import categoriesRouter from "./categories.routes.js";

const router = Router();

// Test Route
router.get("/", (request, response) => {
  response.send({ message: "Hello World! Everything's okay" });
});

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/categories", categoriesRouter);

export default router;
