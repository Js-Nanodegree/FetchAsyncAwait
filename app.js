const express = require('express');
const app = express();
const morgan = require('morgan')

const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev'))

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((error,req,res,next) =>{
    res.status(error.status || 500)
    res.json({
        error:{
            message:'Error.message'
        }
    })
})

module.exports = app