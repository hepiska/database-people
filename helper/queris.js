let model=require('../models')
module.exports={
   insertUser:function(user){
    return new Promise(function(res,rej){
      //console.log(user);
      model.User.create({
        username:user.username,
        email:user.email
      }).then(function(user){
        res(user)
      }).catch(function(err){
        rej(err)
      })
    })
  },
  viewUsers:function(){
    return new Promise (function(res,rej){
      model.User.findAll({}).then(function(data){
        res(data)
      }).catch(function(err){
        rej(err)
      })
    })
  },
  insertSkill:function(skill){
   return new Promise(function(res,rej){
     model.Skill.create({
      skillname:skill.skillname
     }).then(function(skill){
       res(skill)
     }).catch(function(err){
       rej(err)
     })
   })
 },
 userAddSkill:function(user){
   console.log(Number(user.score));
   model.User.find({
     where:{
       email:user.email
     }
   }).then(function(datauser){
     if (datauser) {
       model.Skill.find({
         where:{
           skillname:user.skillname
         }
       }).then(function(skill){
         if (skill) {
           model.UserSkil.find({
             where:{
               user_id:datauser.id,
               skill_id:skill.id
             }
           }).then(function(userskill){
             //console.log(userskill);
              if (userskill) {
                model.UserSkil.update({
                  score:Number(user.score)
                },{
                  where:{
                    user_id:datauser.id,
                    skill_id:skill.id
                  }
                })
              } else {
                model.UserSkil.create({
                  user_id:datauser.id,
                  skill_id:skill.id,
                  score:user.score
                })

              }
           })
         } else {
            model.Skill.create({
              skillname:user.skillname
            }).then(function(skill){
              model.UserSkil.create({
                user_id:datauser.id,
                skill_id:skill.id,
                score:Number(user.score)
              })
            })
         }
       })
     } else {
       console.log('no user with that email');
     }

   })

 },
 showUserSkill:function(inuser){
  return new Promise(function(res,rej){
    model.sequelize.query(`SELECT users.username as username, users.email as email, skills.skillname as skillname, us.score as score
                            from public."Users" users left join public."UserSkils" us on( us.user_id=users.id) left join public."Skills" skills ON(skills.id=us.user_id)
                            where users.email = '${inuser.email}' `
       ,{
         type: model.sequelize.QueryTypes.SELECT
       }).then(function(data){
         res(data)
       })
  })
 }

}
