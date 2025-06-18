import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import generateSlug from "../utils/generateSlug.js";

const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Category",
    tableName: "Categories",
    timestamps: true,
  }
);

Category.beforeCreate((category, options) => {
  const slug = generateSlug(category.name);
  category.slug = slug;
});

export default Category;
