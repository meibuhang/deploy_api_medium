'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    user_id: DataTypes.INTEGER,
    following_user_id: DataTypes.INTEGER
  }, {});
  Follow.associate = function (models) {
    // associations can be defined here

  };
  return Follow;
};