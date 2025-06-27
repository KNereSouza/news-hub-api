import CategoriesRepository from "../repositories/CategoriesRepository.js";

export default class UpdateCategoryService {
  constructor(categoriesRepository = new CategoriesRepository()) {
    this.categoriesRepository = categoriesRepository;
  }

  async handle({ categoryId, updateData }) {
    try {
      const result = await this.categoriesRepository.updateCategory({
        categoryId,
        updateData,
      });

      return result;
    } catch (error) {
      console.error(error.message);
      throw new Error(error.message);
    }
  }
}
