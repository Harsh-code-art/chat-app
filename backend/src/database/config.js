const mongoo = require('mongoose')
const MongooUrl = process.env.mongoo
mongoo.connect(MongooUrl)
const db = mongoo.connection
db.on('open',(err)=>{
    if(err){
        console.log("database is not connectd");
    }
    else{
        console.log("database is connected");
        
    }
})