import { DataTypes } from "sequelize";
import Article from "./Article.js";
import Category from "./Category.js";
import User from "./User.js";

User.hasMany(Article, { foreignKey: "authorId" });

Category.hasMany(Article, { foreignKey: "categoryId" });

Article.belongsTo(User, {
  foreignKey: {
    name: "authorId",
    type: DataTypes.UUID,
    allowNull: false,
  },
});

Article.belongsTo(Category, {
  foreignKey: {
    name: "categoryId",
    type: DataTypes.UUID,
    allowNull: false,
  },
});

export { Article, Category, User };
