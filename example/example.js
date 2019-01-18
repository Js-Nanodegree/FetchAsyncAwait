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


const hash=(tex,salt)=>{return crypto.createHmac('sha512', salt).update(tex).digest('hex')}
const TokenId='12'+1


SetState = (tex,salt,TokenId) =>{
    
    const {NameToken,User,TimeCreate,SessionToken,Root}= JSON.parse(decrypt(tex,salt)) 
    const SessionTokens=hash(JSON.stringify(SessionToken),salt)
    const UserID=hash(JSON.stringify(User+TimeCreate),salt)
    const RootHash =hash(JSON.stringify(Root),salt)
    const ApiKey=crypto.scryptSync(JSON.stringify(NameToken+TimeCreate),salt,25).toString('hex')
    const SecKey=crypto.scryptSync(JSON.stringify(SessionToken+TimeCreate),salt,25).toString('hex')
    const TokenHash =hash(JSON.stringify(ApiKey),SecKey)
    const RevokeHash = hash(JSON.stringify(RootHash+TimeCreate),SecKey)
    const a =`/account/revoke_api/${TokenId}?tkt=${RootHash}&${RevokeHash}`
    const b =`/account/my_api/${TokenId}?tkt=${RootHash}&${UserID}`
    const RevokeUrl =hash(JSON.stringify(a),salt)
    const MailMess = hash(JSON.stringify(b),salt)
        return Object.assign(
            {ID:a},
            {UserID:UserID},
            {SessionToken:SessionTokens},
            {NameToken:NameToken},
            {TimeCreate:TimeCreate},
            {RootHash:RootHash},
            {Root:Root},
            {ApiKey:ApiKey},
            {SecKey:SecKey},
            {TokenHash:TokenHash},
            {RevokeHash:RevokeHash},
            {RevokeHash:RevokeUrl},
            {RevokeHash:MailMess},

            )
}

console.log(SetState(a,secret));
