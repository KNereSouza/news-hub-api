import UsersRepository from "../repositories/UsersRepository.js";

export default class GetUsersService {
  constructor(usersRepository = new UsersRepository()) {
    this.usersRepository = usersRepository;
  }

  async handle(userId) {
    try {
      if (userId) {
        const user = await this.usersRepository.getUsers(userId);
        return user;
      }

      const data = await this.usersRepository.getUsers();
      const users = data.map((object) => object.dataValues);
      return users;
    } catch (error) {
      console.error("Error getting users:", error);
      throw new Error(`Unable to get users: ${error.message}`);
    }
  }
}
