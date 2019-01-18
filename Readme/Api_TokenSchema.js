const {decrypt,encrypt} = require('crypty')
const crypto = require('crypto');


const secret ='P10PJY1ckcMEeZxWHfVzsiOktuXf8O8O'


var data = JSON.stringify({
    User:'JNDsjanvjdsfgbvsdj;nKJSDNCAhsBVACKGCKAS',
    TimeCreate:Date.now(),
    NameToken:'FinTechMustreets',
    SessionToken:'JNDsjanfadsfsdf1256asd1f651ab6f5d1b651v6d16sar156w1v3dsa13fdcv13df1NCAhsBVACKGCKAS',
    Salt:'JNDsjanvjdsfgbvsdj;nKJSDNCAhsBVACKGCKAS',
    Root: {
        AccountInfo: true,
        AccounHistory: true,
        Order: 'JNDsjanvjdsfgbvsdjnKJSDNCAhsBVACKGCKAS',
        Wallets: 'JNDsjanvjdsfgbvsdjnKJSDNCAhsBVACKGCKAS',
        WithDraw: 'JNDsjanvjdsfgbvsdjnKJSDNCAhsBVACKGCKAS',
        }
    }
)
const a =encrypt(data,secret)





const mongoose = require('mongoose');
const {decrypt,encrypt} = require('crypty')
const crypto = require('crypto');

const salt ='P10PJY1ckcMEeZxWHfVzsiOktuXf8O8O'

function hash(param){return (crypto.createHmac('sha512', salt).update(JSON.stringify(param)).digest('hex'))}
function random(){return crypto.randomBytes(256).toString('hex')}

function TokenHash(param){return crypto.scryptSync(JSON.stringify(hash(param)),salt,25).toString('hex')}

function ApiHash(Api,Sec){return(crypto.createHmac('sha512', Sec).update(JSON.stringify(Api)).digest('hex'))}
function RootHash(param){return (crypto.createHmac('sha512', salt).update(JSON.stringify(param)).digest('hex'))}


const Product = mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        name: {
        type: Array,
        set: function(name) {
            const salt ='P10PJY1ckcMEeZxWHfVzsiOktuXf8O8O'              
            const {NameToken,User,TimeCreate,SessionToken,Root}= JSON.parse(decrypt(name,salt)) 
                return Object.assign(
                    {SetState:[ {GroupId:random('hex')},
                                {User:hash(User)},
                                {SessionToken:(hash(SessionToken))},
                                {NameToken:NameToken},
                                {TimeCreate:TimeCreate}]},
                    {Root:[     
                                {RootHash:(RootHash(Root+random()))},
                                {Root:Root}]},
                    {Token:[   {ApiKey:TokenHash(NameToken+TimeCreate+random())},
                                {SecKey:TokenHash(SessionToken+TimeCreate+random())},
                                {TokenHash:ApiHash((NameToken+TimeCreate+random()),(SessionToken+TimeCreate+random()))}]},
                    {Revoke:[   
                                {RevokeHash:hash(RootHash(Root+random())+TimeCreate)},
                                // {RevokeHash:RevokeUrl},
                                // {RevokeHash:MailMess}
                            ]},
                    )    
        }}
    })


module.exports = mongoose.model('Product', Product);