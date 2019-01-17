const express = require('express');
const router = express.Router();
const mongoose= require('mongoose')

const Api =require('../models/product')


router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.post('/', (req, res, next) => {
    const api = new Api ({
        _id:new mongoose.Types.ObjectId(),
        timeCreate: Date.now(),
        email: req.body.email,
        NameToken: req.body.NameToken,
        Cookies:req.body.Cookies,
        Root:{
            AI:req.body.AI,
            AH:req.body.AI,
            O:req.body.O,
            Wa:req.body.Wa,
            Wi:req.body.Wi
        }
    })
    api.save().then(result=>{console.log(result)}).catch(err => console.log(err))

    res.status(201).json({
        message: 'Handling POST requests to /products',
        createdProduct: api
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        });
    }
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product!'
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product!'
    });
});

module.exports = router; 