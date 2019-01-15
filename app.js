const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyparser =require('body-parser')


const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/orders');

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(morgan('dev'))
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use((req,res,next) =>{
    const error =new Error('Not Found')
    error.status(404)
    next(error)
})
app.use((error,req,res,next) =>{
    res.status(error.status || 500)
    res.json({
        error:{
            message:'Error.message'
        }
    })
})

module.exports = app