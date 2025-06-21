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

  async updateCategory({ categoryId, updateData }) {
    try {
      const category = await Category.findByPk(categoryId);

      if (!category) {
        throw new Error(
          `Category with ID ${categoryId} not found. Please verify the category ID and try again.`
        );
      }

      const originalData = category.toJSON();
      await category.update(updateData);

      const changedFields = {};
      for (const key of Object.keys(updateData)) {
        if (originalData[key] !== category[key]) {
          changedFields[key] = category[key];
        }
      }

      return {
        id: category.id,
        changedFields,
        changedCount: Object.keys(changedFields).length,
        success: Object.keys(changedFields).length > 0,
      };
    } catch (error) {
      console.error("Error updating category:", error.message);
      throw new Error(
        `Failed to update category with ID '${categoryId}': ${error.message}`
      );
    }
  }

  async deleteCategory(categoryId) {
    try {
      const category = await Category.findByPk(categoryId);

      if (!category) {
        throw new Error(
          `Category with ID ${categoryId} not found. Please verify the category ID and try again.`
        );
      }

      await Category.destroy({
        where: {
          id: categoryId,
        },
      });

      return category.dataValues;
    } catch (error) {
      console.error("Error deleting category:", error.message);
      throw new Error(
        `Failed to delete category with ID '${categoryId}':\n ${error.message}`
      );
    }
  }
}
