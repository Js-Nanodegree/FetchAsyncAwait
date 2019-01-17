const express = require('express');
const app = express();
const morgan = require('morgan')
const bodyparser =require('body-parser')
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/orders');

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(morgan('dev'))
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


mongoose.connect('mongodb://localhost/apikey',{ useNewUrlParser: true });

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
  });

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