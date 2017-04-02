let router=require('express').Router();
let queris=require('../helper/queris');

router.post('/user',function(req,res){
  console.log(req.body);
    queris.insertUser(req.body).
    then(function(data){
      res.send(data)
    }).catch(function(err){
      res.send(err)
    });
})

router.get('/user',function(req,res){
  queris.viewUsers().then(function(data){
    res.send(data)
  })
}),

router.post('/skill',function(req,res){
  console.log(req.body);
  queris.insertSkill(req.body).then(function(skill){
    res.send(skill)
  }).catch(function(err){
    res.send(err)
  })
}),

router.post('/useraddskill',function(req,res){
  //console.log(req.body.score.number());
  queris.userAddSkill(req.body)
})
router.post('/showuserskill',function(req,res){
  //console.log(req.body.score.number());
  console.log(req.body);
  queris.showUserSkill(req.body).then(function(data){
    res.send(data)
  })
})


module.exports=router;
