import GetArticlesService from "../services/GetArticlesService.js";

export default class GetArticlesController {
  constructor(getArticlesService = new GetArticlesService()) {
    this.getArticlesService = getArticlesService;
  }

  async handle(request, response) {
    const queryData = {};
    const adminAccess =
      request.user &&
      (request.user.role === "admin" || request.user.role === "editor");

    if (typeof request.params.slug === "string") {
      queryData.slug = request.params.slug;
    }

    if (typeof request.query.authorId === "string") {
      queryData.authorId = request.query.authorId;
    }

    if (typeof request.query.categorySlug === "string") {
      queryData.categorySlug = request.query.categorySlug;
    }

    try {
      const articles = await this.getArticlesService.handle(
        adminAccess,
        queryData
      );

      if (articles.length === 0) {
        return response.status(404).json({
          message: "No articles found matching the provided criteria.",
        });
      }

      return response.status(200).json(articles);
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Internal server error. Try again later" });
    }
  }
}
