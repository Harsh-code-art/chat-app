const mongoo = require('mongoose')
const userschema = mongoo.Schema({
    fullname:{
        type:String,
        required:true
    },
    username:{
         type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
         type:String,
        required:true,
        enum:["male","female"]
    },
    password:{
         type:String,
        required:true,
        minlength:6
    },
    profilepic:{
          type:String,
        required:true,
        default:"no pic"
    },
},{timestamp:true})

module.exports = mongoo.model("user",userschema)
// export default user