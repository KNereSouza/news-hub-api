import UsersRepository from "../repositories/UsersRepository.js";

export default class UpdateUserService {
  constructor(usersRepository = new UsersRepository()) {
    this.usersRepository = usersRepository;
  }

  async handle({ id, data }) {
    try {
      const result = await this.usersRepository.updateUser({
        id,
        data,
      });

      return result;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error(`Unable to update the user: ${error.message}`);
    }
  }
}
