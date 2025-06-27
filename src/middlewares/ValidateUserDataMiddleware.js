const validUserRoles = ["author", "editor"];

const validateUserData = (request, response, next) => {
  const data = request.body;

  if (!data || typeof data !== "object") {
    return response.status(400).json({
      message: "Invalid request body.",
    });
  }

  const requiredFields = [
    "firstName",
    "lastName",
    "bio",
    "email",
    "password",
    "role",
  ];

  for (const field of requiredFields) {
    if (!data.hasOwnProperty(field)) {
      return response.status(400).json({
        message: `The field '${field}' is missing.`,
      });
    }

    if (!data[field] || data[field].trim() === "") {
      return response.status(400).json({
        message: `The field '${field}' is empty.`,
      });
    }
  }

  if (!validUserRoles.includes(data.role)) {
    return response
      .status(400)
      .json({ message: `The role '${data.role}' is not a valid option.` });
  }

  next();
};

export default validateUserData;
