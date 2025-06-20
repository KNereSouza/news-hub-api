import { Sequelize, Op, fn, col } from "sequelize";
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

  async getUsers(userId) {
    try {
      if (userId) {
        const user = await User.findByPk(userId, {
          attributes: [
            "id",
            [fn("CONCAT", col("firstName"), " ", col("lastName")), "fullName"],
            "email",
            "bio",
            "role",
            "isActive",
          ],
          where: {
            role: {
              [Op.ne]: "admin",
            },
          },
          order: [["fullName", "ASC"]],
        });

        return user;
      }

      const users = await User.findAll({
        attributes: [
          "id",
          [fn("CONCAT", col("firstName"), " ", col("lastName")), "fullName"],
          "email",
          "bio",
          "role",
          "isActive",
        ],
        where: {
          role: {
            [Op.ne]: "admin",
          },
        },
        order: [["fullName", "ASC"]],
      });
      return users;
    } catch (error) {
      console.error("Error at get all users:", error);
      throw new Error(`Failed to get users: ${error.message}`);
    }
  }

  async updateUser({ id, data }) {
    try {
      const user = await User.findByPk(id);

      if (!user) {
        throw new Error(
          `User with ID ${id} not found. Please verify the user ID and try again.`
        );
      }

      const originalData = user.toJSON();
      await user.update(data);

      const changedFields = {};
      for (const key of Object.keys(data)) {
        if (originalData[key] !== user[key]) {
          changedFields[key] = user[key];
        }
      }

      return {
        id: user.id,
        changedFields,
        changedCount: Object.keys(changedFields).length,
        success: Object.keys(changedFields).length > 0,
      };
    } catch (error) {
      console.error("Error updating user:", error.message);
      throw new Error(
        `Failed to update user with ID '${id}': ${error.message}`
      );
    }
  }

  async deleteUser(id) {
    try {
      const user = await User.findByPk(id);

      if (!user) {
        throw new Error(
          `User with ID ${id} not found. Please verify the user ID and try again.`
        );
      }

      await User.destroy({
        where: {
          id: id,
        },
      });

      return user.dataValues;
    } catch (error) {
      console.error("Error deleting user:", error.message);
      throw new Error(
        `Failed to delete user with ID '${id}': ${error.message}`
      );
    }
  }
}
