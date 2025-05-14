import CreateUserService from "../services/CreateUserService.js";

export default class CreateUserController {
  constructor(createUserService = new CreateUserService()) {
    this.createUserService = createUserService;
  }

  async handle(request, response) {
    const data = request.body;
    try {
      const user = await this.createUserService.handle(data);
      return response.status(201).json(user);
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Internal server error. Try again later" });
    }
  }
}
