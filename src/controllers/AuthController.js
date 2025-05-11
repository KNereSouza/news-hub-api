import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";

const secretKey = process.env.JWT_SECRET;

export default class AuthController {
  static async login(request, response) {
    const data = request.body;

    if (!data || typeof data !== "object") {
      return response.status(400).json({ message: "Invalid request body." });
    }

    const { email, password } = data;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return response.status(404).json({ message: "User not Found." });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return response.status(401).json({ message: "Invalid credentials." });
      }

      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        secretKey,
        { expiresIn: "60min" }
      );

      return response.status(200).json({
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      });
    } catch (error) {
      console.error("Error at login: ", error);
      return response
        .status(500)
        .json({ message: "Internal Server Error. Try again later." });
    }
  }
}
