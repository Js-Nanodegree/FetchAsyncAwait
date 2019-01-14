const fetch =require('node-fetch')

function fetchAvatar(){
    return fetch('http://geoplugin.net/json.gp')
    .then(response=>response.json())
    .then(data =>data.geoplugin_regionName)
}

const result=fetchAvatar()


async function fetchAsyncAvatar(){

    const response=await fetch('http://geoplugin.net/json.gp')
    const data =await response.json()
    return data.geoplugin_city
}

const result=fetchAsyncAvatar()

const fetch =require('node-fetch')

async function PointSearche(){

    return response=await fetch('http://geoplugin.net/json.gp')
    .then(response =>response.json())
    .then(user =>{const promises= user.cats.map(catid=>
        fetch('http://geoplugin.net/json.gp')
        .then(response =response.json())
        .then(catData =>catData.imageUrl)
        )
        return Promise.all(promises)

    })
}

const result=PointSearche()
//result all image со значения user ссылка из даты catid используя Quakka.js 
//открыл xthtp ctrl + shift + p