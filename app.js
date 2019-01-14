const express =require('express')
        app =express()
        server = require('http').createServer(app)
        io =require('socket.io').listen(server)
        users={}
    server.listen(3000)

    app.get('/',function(req,res){
        res.sendfile(__dirname + ' index.html')
    })

    io.sockets.on('connection',function(socket){
        socket.on('new user', function(data,callback){
            if(adta in users){
                callback(true)
                socket.nickname =data
                users[socket.nickname] = socket
                updatenicknames()
            }
        })
        function updatenicknames(){
            io.sockets.emit('usernames',nicknames)
        }
        socket.on('send message',function(data){
            io.sockets.emit('new message',{msg:data, nick: socket.nickname}) 
        })

        socket.on('disconnect',function(data){
            if(!socket.nickname)return
            nicknames.splice(nicknames.indexof(socket.nickname),1)
            updatenicknames
        })
    })