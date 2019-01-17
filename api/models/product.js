const mongoose =require('mongoose')

const schema =mongoose.Schema(
    {
        _id: mongoose.Schema.Types.ObjectId,
        timeCreate: Number,
        email:String,
        NameToken: String,
        Cookies:String,
        Root:{
            AI:Boolean,
            AH:Boolean,
            O:Number,
            Wa:Number,
            Wi:Boolean
        }
    }
)


module.exports =mongoose.model("Apikey",schema)