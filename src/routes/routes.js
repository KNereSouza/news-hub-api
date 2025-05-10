import { Router } from "express";

const router = Router();

router.get("/", (request, response) => {
  response.send({ message: "Hello World! Everything's okay" });
});

export default router;
