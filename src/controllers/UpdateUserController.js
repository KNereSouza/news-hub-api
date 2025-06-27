import UpdateUserService from "../services/UpdateUserService.js";

export default class UpdateUserController {
  constructor(updateUserService = new UpdateUserService()) {
    this.updateUserService = updateUserService;
  }

  async handle(request, response) {
    const id = request.params.id;
    const data = request.body;

    const validFields = [
      "firstName",
      "lastName",
      "bio",
      "email",
      "role",
      "isActive",
    ];

    if (!id || typeof id !== "string") {
      return response.status(400).json({
        message: "Invalid or missing user ID.",
      });
    }

    if (!data || typeof data !== "object") {
      return response.status(400).json({
        message: "Invalid or missing user data to update.",
      });
    }

    for (const item in data) {
      if (!validFields.includes(item)) {
        return response.status(400).json({
          message: `'${item}' is not a valid field, please check it and try again.`,
        });
      }
    }

    try {
      const result = await this.updateUserService.handle({
        id,
        data,
      });

      return response.status(200).json(result);
    } catch (error) {
      if (error.message.includes("not found")) {
        return response.status(404).json({
          message: `User with ID ${id} not found. Please verify the user ID and try again.`,
        });
      }

      return response.status(500).json({
        message: `Failed to update user with ID '${id}'.`,
      });
    }
  }
}
