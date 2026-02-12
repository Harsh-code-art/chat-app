const mongoose = require("mongoose")

const conversationschema = mongoose.Schema({
    participants:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"user"
        }
    ],
    message:[{
         type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            default:[]
    }]
},{timestamps:true})

module.exports = mongoose.model("conversation",conversationschema)