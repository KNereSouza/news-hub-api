import UpdateArticleService from "../services/UpdateArticleService.js";

const validFields = ["title", "content", "thumbnailUrl", "status"];

export default class UpdateArticleController {
  constructor(updateArticleService = new UpdateArticleService()) {
    this.updateArticleService = updateArticleService;
  }

  async handle(request, response) {
    const articleId = request.params.id;
    const updateData = request.body;

    if (!articleId || typeof articleId !== "string") {
      return response.status(400).json({
        message: "Invalid or missing article ID.",
      });
    }

    if (
      !updateData ||
      Object.keys(updateData).length === 0 ||
      typeof updateData !== "object"
    ) {
      return response.status(400).json({
        message: "Invalid or missing article data to update.",
      });
    }

    for (const item in updateData) {
      if (!validFields.includes(item)) {
        return response.status(400).json({
          message: `'${item}' is not a valid field, please check it and try again.`,
        });
      }
    }

    try {
      const result = await this.updateArticleService.handle({
        articleId,
        updateData,
      });

      return response.status(200).json(result);
    } catch (error) {
      if (error.message.includes("not found")) {
        return response.status(404).json({
          message: `Article with ID ${articleId} not found. Please verify the article ID and try again.`,
        });
      }

      return response.status(500).json({
        message: `Failed to update article with ID '${articleId}'.`,
      });
    }
  }
}
