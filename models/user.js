'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {});
  User.associate = function (models) {
    // associations can be defined here
    User.belongsToMany(models.User, {
      foreignKey: "User_id",
      through: "Follows",
      as: "Following",
      sourceKey: "id"
    });
    User.belongsToMany(models.User, {
      foreignKey: "following_user_id",
      through: "Follows",
      as: "Followed",
      sourceKey: "id"
    });
  };
  return User;
};