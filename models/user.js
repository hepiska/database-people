'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    email:{
        type: DataTypes.STRING,
        validate: {
            isEmail: true,
            isuniq: function(value, next) {
                User.find({
                    where: {
                        email: value
                    }
                }).then(function(user) {
                    if (user) {
                        next('already taken')
                    } else {
                        next()
                    }
                })
            }
        }
    }
  }, {
    classMethods: {
      associate: function(models) {
        User.belongsToMany(models.Skill,{through: 'UserSkils', foreignKey: 'user_id' })
      }
    }
  });
  return User;
};
