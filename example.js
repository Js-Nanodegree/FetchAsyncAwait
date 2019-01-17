const Mongoose =require('mongoose')

Mongoose.connect('mongodb://localhost:27017/mydb')

var db = Mongoose.connection

db.once('open',function(){
    console.log('Connect Success')
})

