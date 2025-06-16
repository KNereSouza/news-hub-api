import DeleteUserService from "../services/DeleteUserService.js";

export default class DeleteUserController {
  constructor(deleteUserService = new DeleteUserService()) {
    this.deleteUserService = deleteUserService;
  }

  async handle(request, response) {
    const id = request.params.id;

    if (!id || typeof id !== "string") {
      return response.status(400).json({
        message: "Invalid or missing user ID.",
      });
    }

    try {
      const result = await this.deleteUserService.handle(id);

      return response.status(200).json(result);
    } catch (error) {
      if (error.message.includes("not found")) {
        return response.status(404).json({
          message: `User with ID ${id} not found. Please verify the user ID and try again.`,
        });
      }

      return response.status(500).json({
        message: `Failed to delete user with ID '${id}'.`,
      });
    }
  }
}
