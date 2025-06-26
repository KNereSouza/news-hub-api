import Article from "../models/Article.js";
import Category from "../models/Category.js";
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

  async getArticles({ slug, authorId, categorySlug } = {}) {
    const where = { status: "published" };
    const include = [];

    if (slug) where.slug = slug;
    if (authorId) where.authorId = authorId;
    if (categorySlug) {
      include.push({
        model: Category,
        where: {
          slug: categorySlug,
        },
      });
    }

    try {
      const articles = await Article.findAll({
        where,
        order: [["publishedAt", "DESC"]],
        include,
      });

      return articles;
    } catch (error) {
      console.error("Error at get articles:", error);
      throw new Error(`Failed to get articles: ${error.message}`);
    }
  }

  async updateArticle({ articleId, updateData }) {
    try {
      const article = await Article.findByPk(articleId);

      if (!article) {
        throw new Error(
          `Article with ID ${articleId} not found. Please verify the article ID and try again.`
        );
      }

      const originalData = article.toJSON();
      await article.update(updateData);

      const changedFields = {};
      for (const key of Object.keys(updateData)) {
        if (originalData[key] !== article[key]) {
          changedFields[key] = article[key];
        }
      }

      return {
        id: article.id,
        changedFields,
        changedCount: Object.keys(changedFields).length,
        success: Object.keys(changedFields).length > 0,
      };
    } catch (error) {
      console.error("Error updating article:", error.message);
      throw new Error(
        `Failed to update article with ID '${articleId}': ${error.message}`
      );
    }
  }
}
