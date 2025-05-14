const checkRoles = (requiredRoles) => {
  return (request, response, next) => {
    const user = request.user;

    if (!user) {
      return response
        .status(403)
        .json({ message: "Access denied. User not authenticated." });
    }

    if (!requiredRoles.includes(user.role)) {
      return response.status(403).json({
        message: `Access denied. Required roles: ${requiredRoles.join(
          ", "
        )}. Your role: ${user.role}.`,
      });
    }

    next();
  };
};

export default checkRoles;
