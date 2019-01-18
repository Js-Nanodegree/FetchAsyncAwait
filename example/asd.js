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

const salt ='P10PJY1ckcMEeZxWHfVzsiOktuXf8O8O'
    const hash=(tex,salt)=>{return crypto.createHmac('sha512', salt).update(tex).digest('hex')}
    const TokenId='12'  

function SetState(tex){

    const salt ='P10PJY1ckcMEeZxWHfVzsiOktuXf8O8O'
    const hash=(tex,salt)=>{return crypto.createHmac('sha512', salt).update(tex).digest('hex')}
    const TokenId='12'  
    
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
    const mimi =JSON.stringify(Object.assign(
        {ID:tex},
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

        ))
        const ass =JSON.parse(mimi)
        return ass
}
const a = 'c222971bae1453f68d472dd49d093cbc45fdb6cdb97969d027f3c81633081aec10ee768ec64171e956740975a4fc15d0fc3a2268dedd2b1cfca5379a6fe6f8f2164117a0ad2400903d7cba3d9479727a4160254db2a692e7214d4e73c20a2b3d4e89ffed25421237a606e322ee871b0825c36f4503ef10c6b84762beebaf20de371d17adea06a25980d9b00d86c5c1d08b64c86f50346d91a8c5965a2f374de5951550ea089aec1beb8a0729d1a725610ab7545fbac17f6794bbbc216c88327e8c8793dd922371287b332becc15a4d3a8c9283351fbfdb65060eac71df22f21935d764ae15ff66e298963244309b9b8366b6d7c074080bb40ef1e19683c96301f0231b4dd21a7e4000e8b5e3906c9771a80b8e6accc19bbb906036b3c47eeb23c44c129980c099fd8ed28b8503c8040cc4d218c059134928625562fd5b4ae87199cd3c51aef1c6150fa61751daa051fd259be1267bef54a58613f10c40539f3b5c388849ff3c562cafa85d59f159cf13329f0030b4418bd6debdd7359c2797f80209b98112ef6c4d2829d28988566c6e3e27983395f3a57597b4904cc850996150dcd93adde5902a97dc2f462c3cd4165257b65e028ae54fda9722391642888ed1135957f44802a0c99f5553445b63cb'
console.log(SetState(a,salt,TokenId))