import jwt from "jsonwebtoken";

const optionalAuthMiddleware = (request, response, next) => {
  const authHeader = request.headers["authorization"];

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      request.user = decoded;
    } catch (err) {
      request.user = undefined;
    }
  }

  next();
};

export default optionalAuthMiddleware;
