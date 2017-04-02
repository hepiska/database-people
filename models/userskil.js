'use strict';
module.exports = function(sequelize, DataTypes) {
  var UserSkil = sequelize.define('UserSkil', {
    user_id: DataTypes.INTEGER,
    skill_id: DataTypes.INTEGER,
    score:DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return UserSkil;
};
