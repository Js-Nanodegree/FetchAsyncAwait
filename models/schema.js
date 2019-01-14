const Mongoose = require('mongoose')

const schema =Mongoose.Schema

const NinjaSchema = new Schema({
    name:{
        type:String,
        required:(true,"Name field is required")
    },
    rank:{
        type:String
    },
    available:{
        type:Boolean,
        default:false
    }
})

const Ninja =Mongoose.model('Ninja', NinjaSchema)

module.exports = Ninja