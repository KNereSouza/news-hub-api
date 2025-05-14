import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET;

const authenticateToken = (request, response, next) => {
  if (!secretKey) {
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

  try {
    const decoded = jwt.verify(token, secretKey);
    request.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return response.status(403).json({ message: "Token has expired." });
    }
    return response.status(403).json({ message: "Invalid or expired token." });
  }
};

export default authenticateToken;
