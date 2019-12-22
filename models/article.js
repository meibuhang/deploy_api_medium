"use strict";
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define(
    "Article",
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      image: DataTypes.STRING,
      category_id: DataTypes.INTEGER,
      category_name: DataTypes.STRING,
      is_published: DataTypes.BOOLEAN,
      is_archived: DataTypes.BOOLEAN,
      slug: DataTypes.STRING,
      author_id: DataTypes.INTEGER
    },
    {}
  );
  Article.associate = function(models) {
    Article.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "categories",
      sourceKey: "id"
    });
    Article.belongsTo(models.User, {
      foreignKey: "author_id",
      as: "users",
      sourceKey: "id"
    });
    Article.hasMany(models.Comment,
      { foreignKey:"id", as: "comments"})
  };
  return Article;
};
