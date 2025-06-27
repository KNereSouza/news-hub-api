import DeleteArticleService from "../services/DeleteArticleService.js";

export default class DeleteArticleController {
  constructor(deleteArticleService = new DeleteArticleService()) {
    this.deleteArticleService = deleteArticleService;
  }

  async handle(request, response) {
    const articleId = request.params.id;

    if (!articleId || typeof articleId !== "string") {
      return response.status(400).json({
        message: "Invalid or missing article ID",
      });
    }

    try {
      const result = await this.deleteArticleService.handle(articleId);

      return response.status(200).json(result);
    } catch (error) {
      if (error.message.includes("not found")) {
        return response.status(404).json({
          message: `Article with ID ${articleId} not found. Please verify the article ID and try again.`,
        });
      }

      return response.status(500).json({
        message: `Failed to delete article with ID '${articleId}'.`,
      });
    }
  }
}
