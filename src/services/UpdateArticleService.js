import ArticlesRepository from "../repositories/ArticlesRepository.js";

export default class UpdateArticleService {
  constructor(articlesRepository = new ArticlesRepository()) {
    this.articlesRepository = articlesRepository;
  }

  async handle({ articleId, updateData }) {
    try {
      const result = await this.articlesRepository.updateArticle({
        articleId,
        updateData,
      });

      return result;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}
