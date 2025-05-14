import UsersRepository from "../repositories/UsersRepository.js";

export default class CreateUserService {
  constructor(usersRepository = new UsersRepository()) {
    this.usersRepository = usersRepository;
  }

  async handle({ firstName, lastName, bio, email, password, role }) {
    try {
      const data = await this.usersRepository.createUser({
        firstName,
        lastName,
        bio,
        email,
        password,
        role,
      });

      return data;
    } catch (error) {
      console.error("Error creating user:", error.message);
      throw new Error("Unable to create user. Please try again later.");
    }
  }
}
