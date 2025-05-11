import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;

const authenticateToken = (request, response, next) => {
  if (!secretKey) {
    console.error("JWT_SECRET is not defined in the environment variables.");
    return response
      .status(500)
      .json({ message: "Internal server error. Please try again later." });
  }

  const authHeader = request.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return response.status(401).json({
      message: "Access denied, token not provided or invalid format.",
    });
  }

  const token = request.headers.authorization?.split(" ")[1];

  if (!token) {
    return response
      .status(401)
      .json({ message: "Access denied, token not provided." });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    request.user = decoded;
    next();
  } catch (error) {
    return response.status(403).json({ message: "Invalid or expired token." });
  }
};

export { authenticateToken };
