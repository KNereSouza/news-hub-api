import CategoriesRepository from "../repositories/CategoriesRepository.js";

export default class DeleteCategoryService {
  constructor(categoriesRepository = new CategoriesRepository()) {
    this.categoriesRepository = categoriesRepository;
  }

  async handle(categoryId) {
    try {
      const result = await this.categoriesRepository.deleteCategory(categoryId);
      return result;
    } catch (error) {
      console.error("Error deleting category:", error);
      throw new Error(`Unable to delete the category:\n ${error.message}`);
    }
  }
}
