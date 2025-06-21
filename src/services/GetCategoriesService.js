import CategoriesRepository from "../repositories/CategoriesRepository.js";

export default class GetCategoriesService {
  constructor(categoriesRepository = new CategoriesRepository()) {
    this.categoriesRepository = categoriesRepository;
  }

  async handle(slug) {
    try {
      if (!slug) {
        const data = await this.categoriesRepository.getCategories();
        const categories = data.map((object) => object.dataValues);

        return categories;
      }

      const category = await this.categoriesRepository.getCategories(slug);
      return category;
    } catch (error) {
      console.error("Error getting categories:", error);
      throw new Error(`Unable to get categories: ${error.message}`);
    }
  }
}
