import CategoriesRepository from "../repositories/CategoriesRepository.js";

export default class CreateCategoryService {
  constructor(categoriesRepository = new CategoriesRepository()) {
    this.categoriesRepository = categoriesRepository;
  }

  async handle({ name, description }) {
    try {
      const data = await this.categoriesRepository.createCategory({
        name,
        description,
      });

      return data;
    } catch (error) {
      console.error("Error creating category:", error.message);
      throw new Error("Unable to create category. Please try again later.");
    }
  }
}
