import Category from "../models/Category.js";
import { Op, Sequelize } from "sequelize";
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

  async getCategories(slug) {
    try {
      if (!slug) {
        const categories = await Category.findAll({
          order: [["name", "ASC"]],
        });
        return categories;
      }

      const category = await Category.findOne({
        where: {
          slug: {
            [Op.eq]: slug,
          },
        },
      });

      return category;
    } catch (error) {
      console.error("Error at get categories:", error);
      throw new Error(`Failed to get categories: ${error.message}`);
    }
  }
}
