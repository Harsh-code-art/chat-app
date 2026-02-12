const jwt = require("jsonwebtoken")

exports.jsonwebtoken = (userId,res)=>{
    const token = jwt.sign({userId},process.env.jwt,{
        expiresIn:'2d'
    })
    res.cookie('jwt',token,{
        maxAge:30*4*60*1000
        
        // httpOnly:true
    })
}