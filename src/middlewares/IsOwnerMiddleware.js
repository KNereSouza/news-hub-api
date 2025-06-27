/**
 * Middleware to check if the authenticated user is the owner of the article
 * or has one of the required roles (e.g., admin, editor).
 *
 * @param   { Array<string> } requiredRoles - Roles allowed to access the resource.
 * @returns { Function } Express middleware function.
 */
import Article from "../models/Article.js";

const isOwner = (requiredRoles) => async (request, response, next) => {
  const articleId = request.params.id;
  const user = request.user;

  if (!user) {
    return response
      .status(403)
      .json({ message: "Access denied. User not authenticated." });
  }

  try {
    const article = await Article.findByPk(articleId);
    if (!article) {
      return response.status(404).json({
        message: `Article with ID ${articleId} not found. Please verify the article ID and try again.`,
      });
    }

    if (article.authorId !== user.id && !requiredRoles.includes(user.role)) {
      return response.status(403).json({
        message: `Access denied. You do not have permission to perform this action. Only the article owner or users with the required roles (${requiredRoles.join(
          ", "
        )}) are authorized.`,
      });
    }
  } catch (error) {
    return response.status(500).json({
      message: `Failed to update article with ID '${articleId}'.`,
    });
  }

  next();
};

export default isOwner;
