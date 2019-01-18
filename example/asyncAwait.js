const fetch =require('node-fetch')

async function getsUser(id){
    return {id:1}
}
getUser(1)

let user =getUser(1).then(user=>console.log(user))






/////////////////////////////sdfsadfsdfsdfdsfdsfsd









async function getUser(id){
    return Promise.resolve({id:1}) 
}


getUser(1).then(user=>console.log(user))

async function main(){
    let user =await getsUser(1)
    console.log(user)
}

main()





/////////////////////////////sdfsadfsdfsdfdsfdsfsd









async function fetchUser(id){
    let response =await fetch('https://jsonplaceholder.typicode.com/users/'+id)
    let data =await response.json()

    return data
}

async function smain(id){
    let user =await fetchUser(id)
    console.log(user)
}

smain(10)





/////////////////////////////sdfsadfsdfsdfdsfdsfsd





const nn ={
    getUser: async function fetchUser(){
    let response =await fetch("https://jsonplaceholder.typicode.com/users/1")
    let data =await response.json()

    return data
    }   
}


async function s1main(){
    let user =await nn.getUser()
    console.log(user)
}

s1main()






/////////////////////////////sdfsadfsdfsdfdsfdsfsd







class nnc{
    async fetchUser(){
    let response =await fetch("https://jsonplaceholder.typicode.com/users/1")
    let data =await response.json()

    return data
    }   
}


async function s21main(){
    let nin =new nnc()
    let user =await nin.fetchUser()
    console.log(user)
}

s21main()





/////////////////////////////sdfsadfsdfsdfdsfdsfsd




var post=[{
    'name':'fasdasd'
},{
    'name':'fasdasd'
},{
    'name':'fasdasd'
}]

function createPost(post){
    return new Promise((resolve,reject) =>{
        setTimeout(()=>{
            postMessage.push(post)
            const error = false
            if(!error){
                resolve()
            }else{
                reject('Error:')
            }
        })
    }
    )
}
const promise1=Promise.resolve({name:'Slava'})
const promise2=Promise.resolve({surname:'Slava'})
const promise3 =Promise.resolve({work:'Slava'})

Promise.all([promise1,promise2,promise3]).then(values =>console.log(values))

