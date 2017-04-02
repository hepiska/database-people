'use strict';
module.exports = function(sequelize, DataTypes) {
  var Skill = sequelize.define('Skill', {
    skillname: {
        type: DataTypes.STRING,
        validate: {
            isuniq: function(value, next) {
                Skill.find({
                    where: {
                        skillname: value
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
       Skill.belongsToMany(models.User,{through: 'UserSkils', foreignKey: 'skill_id' })
      }
    }
  });
  return Skill;
};
