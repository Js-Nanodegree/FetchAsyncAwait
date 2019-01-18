var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
const crypto = require('crypto');


app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))


//сам запрос


const asdas='c222971bae1453f68d472dd49d093cbc45fdb6cdb97969d027f3c81633081aec10ee768ec64171e956740975a4fc15d0fc3a2268dedd2b1cfca5379a6fe6f8f2164117a0ad2400903d7cba3d9479727a4160254db2a692e7214d4e73c20a2b3d4e89ffed25421237a606e322ee871b0825c36f4503ef10c6b84762beebaf20de371d17adea06a25980d9b00d86c5c1d08b64c86f50346d91a8c5965a2f374de5951550ea089aec1beb8a0729d1a725610ab7545fbac17f6794bbbc216c88327e8c8793dd922371287b332becc15a4d3a8c9283351fbfdb65060eac71df22f21935d764ae15ff66e298963244309b9b8366b6d7c074080bb40ef1e19683c96301f0231b4dd21a7e4000e8b5e3906c9771a80b8e6accc19bbb906036b3c47eeb23c44c129980c099fd8ed28b8503c8040cc4d218c059134928625562fd5b4ae87199cd3c51aef1c6150fa61751daa051fd259be1267bef54a58613f10c40539f3b5c388849ff3c562cafa85d59f159cf13329f0030b4418bd6debdd7359c2797f80209b98112ef6c4d2829d28988566c6e3e27983395f3a57597b4904cc850996150dcd93adde5902a97dc2f462c3cd4165257b65e028ae54fda9722391642888ed1135957f44802a0c99f5553445b63cb'

const salt = 'P10PJY1ckcMEeZxWHfVzsiOktuXf8O8O' /// Поиск по User !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
const RemoteId = '1531'


function makeGenToken(params) {
  
    const salt ='P10PJY1ckcMEeZxWHfVzsiOktuXf8O8O'
    const {NameToken,Root,TimeCreate,User} = decompose(params)
    const RemoteId = '1531'

  
    function UserSearch(params) {
        
    }
  
    function RemoteIdClone(params) {
        
    }
  
    function SaltUserSearche(params) {
        
    }

  
    function decompose(params){
        
        const {decrypt}=require('crypty')
        const decrypted = decrypt(params,salt)
        const {NameToken,User,TimeCreate,SessionToken,Root}=JSON.parse(decrypted)
        return {NameToken,User,TimeCreate,SessionToken,Root}
          
    }
    console.log(decompose(params))
      
    function hash(param){
        let secret =SaltUserSearche() ///поиск изменить Salt



        return (crypto.createHmac('sha512', salt).update(JSON.stringify(param)).digest('hex'))
    }
    console.log(hash(params))
      
    function TokenHash(param){
        return crypto.scryptSync(JSON.stringify(hash(param)),salt,25).toString('hex')}

    
      
    function ApiHash(Api,Sec){
        return(crypto.createHmac('sha512', Sec).update(JSON.stringify(Api)).digest('hex'))}
      
    function TokenGenerate(param){
        try{
          const random =crypto.randomBytes(256).toString('hex')
          const {TimeCreate,SessionToken,NameToken,Root}=decompose(params)
          const a = TokenHash(NameToken+TimeCreate+random)
          const b = TokenHash(SessionToken+TimeCreate+random)
          const c = ApiHash(a,b)
          const d =hash(Root+random)
          const e =hash(SessionToken+random)
                  return Object.assign({ApiKey:a},{SecKey:b},{TokenHash:c},{RootHash:d},{SessionHash:e},{random:random})}
        catch(e){ console.log("Отменить токен")
      
        }
    }
  
    function Compose(params) {
        const a =TokenGenerate(params)
        const c=Object.assign(
            {SetState:[ {NameToken:NameToken},
                        {Root:Root},
                        {TimeCreate:TimeCreate},
                        {User:User},
                        {RemoteId:RemoteId}]},
                        {Hash:[a]})
        return c
    }
    return Compose()
  }



/// Схема монгосе


var Message = mongoose.model('Message',{
  name : String,
  message :{
    type:Array,
    set:makeGenToken(message)
  }
})


//Пост запрос на сервер для записи

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

/// коллекция монгосе

var dbUrl = 'mongodb://localhost/apikey'

//параметры 

io.on('connection', () =>{
  console.log('a user is connected')
})

mongoose.connect(dbUrl ,{useMongoClient : true} ,(err) => {
  console.log('mongodb connected',err);
})

var server = http.listen(3000, () => {
  console.log('server is running on port', server.address().port);
});