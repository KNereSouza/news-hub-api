import ArticlesRepository from "../repositories/ArticlesRepository.js";

export default class GetArticlesService {
  constructor(articlesRepository = new ArticlesRepository()) {
    this.articlesRepository = articlesRepository;
  }

  async handle(adminAccess, queryData = {}) {
    try {
      const data = await this.articlesRepository.getArticles(
        adminAccess,
        queryData
      );
      const articles = data.map((item) => item.dataValues);

      return articles;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
}
