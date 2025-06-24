import Article from "../models/Article.js";
import generateSlug from "../utils/generateSlug.js";

export default class ArticlesRepository {
  async createArticle({ title, content, thumbnailUrl, authorId, categoryId }) {
    try {
      const createdArticle = await Article.create({
        title,
        slug: generateSlug(title),
        content,
        thumbnailUrl,
        status: "draft",
        authorId,
        categoryId,
      });

      console.log("New Article successfully CREATED:\n", {
        id: createdArticle.id,
        title: createdArticle.title,
        status: createdArticle.status,
        authorId: createdArticle.authorId,
        categoryId: createdArticle.categoryId,
      });

      return createdArticle;
    } catch (error) {
      if (
        error.name === "SequelizeUniqueConstraintError" ||
        error instanceof Sequelize.UniqueConstraintError
      ) {
        throw new Error("An article with this slug already exists.");
      }

      if (
        error.name === "SequelizeValidationError" ||
        error instanceof Sequelize.ValidationError
      ) {
        throw new Error(
          "Validation error: " + error.errors.map((e) => e.message).join(", ")
        );
      }

      console.error("Error at creating a new article:", error);
      throw new Error(`Failed to create article: ${error.message}`);
    }
  }
}
