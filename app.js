const app = require('express')()

const bodyParser =require('body-parser')

app.use(bodyParser.json())
app.use('/api', require('./routes/index'))

app.get('/',function(req,res){
    res.send({name:'Youshi'})
    console.log('get request')
})

app.post('/qw',function(req,res){
    res.send({name:'Youshi'})
    console.log('get request')
})

app.listen(4100, function(){
    console.log('listening')
})