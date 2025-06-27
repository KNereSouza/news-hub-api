import GetUsersService from "../services/GetUsersService.js";

export default class GetUsersController {
  constructor(getUsersService = new GetUsersService()) {
    this.getUsersService = getUsersService;
  }

  async handle(request, response) {
    const userId = request.params.id;

    try {
      if (!userId) {
        const users = await this.getUsersService.handle();
        return response.status(200).json(users);
      }

      const user = await this.getUsersService.handle(userId);
      console.log(user);

      if (!user) {
        return response.status(404).json({
          message: `User with ID ${userId} not found. Please verify the user ID and try again.`,
        });
      }

      return response.status(200).json(user);
    } catch (error) {
      return response
        .status(500)
        .json({ message: "Internal server error. Try again later" });
    }
  }
}
