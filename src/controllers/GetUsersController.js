import GetUsersService from "../services/GetUsersService.js";

export default class GetUsersController {
  constructor(getUsersService = new GetUsersService()) {
    this.getUsersService = getUsersService;
  }

  async handle(request, response) {
    try {
      const users = await this.getUsersService.handle();
      return response.status(200).json(users);
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Internal server error. Try again later" });
    }
  }
}
