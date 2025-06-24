import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import generateSlug from "../utils/generateSlug.js";

const Article = sequelize.define(
  "Article",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    thumbnailUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    status: {
      type: DataTypes.ENUM("draft", "pending", "published", "archived"),
      defaultValue: "draft",
    },
    publishedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "Article",
    tableName: "Articles",
    timestamps: true,
  }
);

Article.beforeValidate((article, options) => {
  const slug = generateSlug(article.title);
  article.slug = slug;
});

Article.beforeSave((article) => {
  if (article.status === "published" && !article.publishedAt) {
    article.publishedAt = new Date();
  }
});

export default Article;
