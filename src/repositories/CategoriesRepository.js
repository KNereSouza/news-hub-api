import Category from "../models/Category.js";
import { Sequelize } from "sequelize";
import generateSlug from "../utils/generateSlug.js";

export default class CategoriesRepository {
  async createCategory({ name, description }) {
    try {
      const newCategory = await Category.create({
        name,
        description,
        slug: generateSlug(name),
      });

      console.log("New category sucessfully CREATED: ", {
        id: newCategory.id,
        name: newCategory.name,
        description: newCategory.description,
        slug: newCategory.slug,
      });

      return newCategory;
    } catch (error) {
      if (error instanceof Sequelize.UniqueConstraintError) {
        throw new Error("This slug already in use.");
      }

      console.error("Error creating category:", error);
      throw new Error(`Failed to create category: ${error.message}`);
    }
  }
}
