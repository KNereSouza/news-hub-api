import UpdateCategoryService from "../services/UpdateCategoryService.js";

export default class UpdateCategoryController {
  constructor(updateCategoryService = new UpdateCategoryService()) {
    this.updateCategoryService = updateCategoryService;
  }

  async handle(request, response) {
    const categoryId = request.params.id;
    const updateData = request.body;

    const validFields = ["name", "description"];

    if (!categoryId || typeof categoryId !== "string") {
      return response.status(400).json({
        message: "Invalid or missing category ID.",
      });
    }

    if (!updateData || typeof updateData !== "object") {
      return response.status(400).json({
        message: "Invalid or missing category data to update.",
      });
    }

    for (const item in updateData) {
      if (!validFields.includes(item)) {
        return response.status(400).json({
          message: `'${item}' is not a valid field, please check it and try again.`,
        });
      }
    }

    try {
      const result = await this.updateCategoryService.handle({
        categoryId,
        updateData,
      });

      return response.status(200).json(result);
    } catch (error) {
      if (error.message.includes("not found")) {
        return response.status(404).json({
          message: `Category with ID ${categoryId} not found. Please verify the category ID and try again.`,
        });
      }

      return response.status(500).json({
        message: `Failed to update category with ID '${categoryId}'.`,
      });
    }
  }
}
