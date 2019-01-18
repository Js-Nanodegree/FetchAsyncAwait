let Token = {
  1: {
    //провожу поиск по username при получении или сверке Salt отправляю с backend
    username: 'Robin Wieruch',
    idToken: '1',
    NameToken:'TheFundArkStart!'

    StateCreate:{
        User:'Yakimov V.A',
        TimeCreate:'461631635165416',
        SessionToken:'HashSession'    ,
        Salt:'131531513512536136',

        Root:{
            RootHash:'Hash Root Tooken',
            AccountInfo:'true',
            AccounHistory:'true',
            Order:'Hash_gdfajuilbnfhvuaifiulawefbebgfyuthjksvdfca',
            Wallets:'Hash_hjasdfghjasdfhsgdiuahfgidsahgfdisahbfdfbka',
            WithDraw:'Hash_ahdsufjiajasfdbhasigudfhbsiaulfdbhisaud',
        }
        //Record backend

        Revoke:{
            RevokeHash:'Hash_fjdsbhafgjghujiaosaabdfsfbsd',
            RevokeUrl:'Hash_hguidahgiufshldufgflsdhgsfdujhl',
            RevokeUrl:'/account/revoke_api/{TokenId}?tkt={RootHashid}&{HashRevoke}',
            RevokeMessage:'Permanently revoke and disable your key: {NameToken} ( ID: {IdToken}; Secret: {SecretKey_Fragment} )?',
        
        }

        //Record Backend получаю PubKey в запросе и hash в header и сверяю. TimeCreate+Salt = PrivKey
        Token:{
            PubKey:'Hash_fdsjaghsfdjgjsdugsjdfasfd' ,
            PrivKeyFragment:'Hash_gajkgnhjsa..........',
            TokenHash:'Hash_gfjsadgnhbjfsdgnjksdfnfdskjl',
        }
        }
    }
  },


  
