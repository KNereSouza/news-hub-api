const validateCategoryData = (request, response, next) => {
  const data = request.body;

  if (!data || typeof data !== "object") {
    return response.status(400).json({
      message: "Invalid request body.",
    });
  }

  const requiredFields = ["name", "description"];

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

  next();
};

export default validateCategoryData;
