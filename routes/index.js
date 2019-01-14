const express = require('express')
const router =express.Router()


//get a list of Ninjas from Db
router.get('/ninjas',function(req,res){
    console.log(req.body)
    res.send({
        type:'Get',
        name:req.destroy.name,
        rank:req.body.rank
    })
})
//add a new Ninja to the Db
router.post('/ninjas',function(req,res){
    res.send({type:'Post'})
})
//Update a ninja in the db
router.put('/ninjas/:id',function(req,res){
    res.send({type:'Put'})
})
//Router Delete a ninja in the db
router.delete('/ninjas/:id',function(req,res){
    res.send({type:'delete'})
})

module.exports = router