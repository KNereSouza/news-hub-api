import DeleteCategoryService from "../services/DeleteCategoryService.js";

export default class DeleteCategoryController {
  constructor(deleteCategoryService = new DeleteCategoryService()) {
    this.deleteCategoryService = deleteCategoryService;
  }

  async handle(request, response) {
    const categoryId = request.params.id;

    if (!categoryId || typeof categoryId !== "string") {
      return response.status(400).json({
        message: "Invalid or missing user ID.",
      });
    }

    try {
      const result = await this.deleteCategoryService.handle(categoryId);

      return response.status(200).json(result);
    } catch (error) {
      if (error.message.includes("not found")) {
        return response.status(404).json({
          message: `Category with ID ${categoryId} not found. Please verify the category ID and try again.`,
        });
      }

      return response.status(500).json({
        message: `Failed to delete category with ID '${categoryId}'.`,
      });
    }
  }
}
