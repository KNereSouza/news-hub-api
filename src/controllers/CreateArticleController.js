import CreateArticleService from "../services/CreateArticleService.js";

export default class CreateArticleController {
  constructor(createArticleService = new CreateArticleService()) {
    this.createArticleService = createArticleService;
  }

  async handle(request, response) {
    const body = request.body;

    try {
      const article = await this.createArticleService.handle(body);
      return response.status(201).json(article);
    } catch (error) {
      if (error.message.includes("not found")) {
        const missing = error.message.split(" ")[0];
        const id =
          missing.toLowerCase() === "author" ? body.authorId : body.categoryId;

        return response.status(404).json({
          message: `${missing} with ID '${id}' not found. Please verify the ${missing.toLowerCase()} ID and try again.`,
        });
      }

      if (error.message.includes("slug")) {
        return response.status(400).json({
          message:
            "An article with the provided slug already exists. Please use a different title",
        });
      }

      return response
        .status(500)
        .json({ message: "Internal server error. Try again later" });
    }
  }
}
