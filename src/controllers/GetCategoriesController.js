import GetCategoriesService from "../services/GetCategoriesService.js";

export default class GetCategoriesController {
  constructor(getCategoriesService = new GetCategoriesService()) {
    this.getCategoriesService = getCategoriesService;
  }

  async handle(request, response) {
    const slug = request.params.slug;

    try {
      if (!slug) {
        const categories = await this.getCategoriesService.handle();
        return response.status(200).json(categories);
      }

      const category = await this.getCategoriesService.handle(slug);

      if (!category) {
        return response.status(404).json({
          message: `Category with slug '${slug}' not found. Please verify the slug and try again.`,
        });
      }

      return response.status(200).json(category);
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Internal server error. Try again later" });
    }
  }
}
