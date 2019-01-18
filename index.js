var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');


app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

function decompose(params){
  const salt = 'P10PJY1ckcMEeZxWHfVzsiOktuXf8O8O'
  const crypty=require('crypty')
  const decrypt = crypty.decrypt(params,salt)
  const encrypt = crypty.encrypt(JSON.stringify(param),salt) 

  return encrypt

}


var Message = mongoose.model('Message',{
  name : String,
  message :{
    type:Array,
    set:function(message){
      const decomp=decompose(message)
      const {NameToken,User,TimeCreate,SessionToken,Root} = JSON.parse(decomp)
      return Object.assign({SetState:[{NameToken:NameToken},
                                      {User:User},
                                      {TimeCreate:TimeCreate},
                                      {SessionToken:SessionToken},
                                      {Root:Root},
      ]})
    }
  }
})



app.get('/messages', (req, res) => {
  Message.find({},(err, messages)=> {
    res.send(messages);
  })
})


app.get('/messages/:user', (req, res) => {
  var user = req.params.user
  Message.find({name: user},(err, messages)=> {
    res.send(messages);
  })
})


app.post('/messages', async (req, res) => {
  try{
    var message = new Message(req.body);

    var savedMessage = await message.save()
      console.log('saved');

    var censored = await Message.findOne({message:'badword'});
      if(censored)
        await Message.remove({_id: censored.id})
      else
        io.emit('message', req.body);
      res.sendStatus(200);
  }
  catch (error){
    res.sendStatus(500);
    return console.log('error',error);
  }
  finally{
    console.log('Message Posted')
  }


})



var dbUrl = 'mongodb://localhost/apikey'

io.on('connection', () =>{
  console.log('a user is connected')
})

mongoose.connect(dbUrl ,{useMongoClient : true} ,(err) => {
  console.log('mongodb connected',err);
})

var server = http.listen(3000, () => {
  console.log('server is running on port', server.address().port);
});