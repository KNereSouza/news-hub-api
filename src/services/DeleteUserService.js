import UsersRepository from "../repositories/UsersRepository.js";

export default class DeleteUserService {
  constructor(usersRepository = new UsersRepository()) {
    this.usersRepository = usersRepository;
  }

  async handle(id) {
    try {
      const result = await this.usersRepository.deleteUser(id);
      return result;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error(`Unable to delete the user: ${error.message}`);
    }
  }
}
