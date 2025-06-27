import ArticlesRepository from "../repositories/ArticlesRepository.js";

export default class DeleteArticleService {
  constructor(articlesRepository = new ArticlesRepository()) {
    this.articlesRepository = articlesRepository;
  }

  async handle(articleId) {
    try {
      const result = await this.articlesRepository.deleteArticle(articleId);
      return result;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}
