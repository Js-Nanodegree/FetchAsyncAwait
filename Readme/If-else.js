if hash.client === hash.db ()=>
    {onSuccess
       {if PubKey.client === PubKey.db ()=>
            onSuccess{
                какая-переменная третья проверка. 
                можно вставить проверку по Ip тогда на роспотребнадзор будем похожи
                сверять по геолокации
                сверять с устройства 
                сверять с куки 
                () =>
                onSuccess {
                    обноружен id tokena
                    проверяються права и сверяется cо статусом заявки ()=>
                    onSuccess{
                        проверка на Socket.io('dissconnect || connect')()=>
                        {
                        регистрируется ордер
                        регистрируется Fee
                        записывается в базу данных
                        любимый твой Nonce()
                        записываются Hash.
                        отправка клиенту.
                        }
                        
                    }onFail{
                    Console.log('что то пошло не так')
                    }
                }
                onFail{
                    Console.log{'повторите попытку'}
                }
            }onFail{
               Console.log('dissconnect')
               нужно поместить что то в бан          
            }
                    
        }
        onFail{
            Console.log('dissconnect')
            нужно поместить что то в бан
        }
    }