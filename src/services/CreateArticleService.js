import ArticlesRepository from "../repositories/ArticlesRepository.js";

import User from "../models/User.js";
import Category from "../models/Category.js";

export default class CreateArticleService {
  constructor(articlesRepository = new ArticlesRepository()) {
    this.articlesRepository = articlesRepository;
  }

  async handle({ title, content, thumbnailUrl, status, authorId, categoryId }) {
    const [user, category] = await Promise.all([
      User.findByPk(authorId),
      Category.findByPk(categoryId),
    ]);

    const errors = [];
    if (!user) {
      errors.push("Author not found. Check the author ID and try again.");
    }
    if (!category) {
      errors.push("Category not found. Check the category ID and try again.");
    }
    if (errors.length > 0) {
      throw new Error(errors.join("\n"));
    }

    try {
      const createdArticle = await this.articlesRepository.createArticle({
        title,
        content,
        thumbnailUrl,
        authorId,
        categoryId,
      });

      return createdArticle;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
}
