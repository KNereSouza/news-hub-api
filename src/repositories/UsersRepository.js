import { Sequelize } from "sequelize";
import User from "../models/User.js";
import bcrypt from "bcrypt";

export default class UsersRepository {
  async createUser({ firstName, lastName, bio, email, password, role }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        firstName,
        lastName,
        bio,
        email,
        password: hashedPassword,
        role: role || "author",
      });

      console.log("New user sucessfully CREATED: ", {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      });

      return newUser;
    } catch (error) {
      if (error instanceof Sequelize.UniqueConstraintError) {
        throw new Error("This e-mail already in use.");
      }

      console.error("Error creating user:", error);
      throw new Error(`Failed to create user: ${error.message}`);
    }
  }
}
