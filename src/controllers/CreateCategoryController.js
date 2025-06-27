import CreateCategoryService from "../services/CreateCategoryService.js";

export default class CreateCategoryController {
  constructor(createCategoryService = new CreateCategoryService()) {
    this.createCategoryService = createCategoryService;
  }

  async handle(request, response) {
    const body = request.body;
    try {
      const category = await this.createCategoryService.handle(body);
      return response.status(201).json(category);
    } catch (error) {
      return response.status(500).json({
        message: `Internal server error. Try again later.`,
      });
    }
  }
}
