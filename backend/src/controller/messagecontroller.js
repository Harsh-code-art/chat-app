const { getReciverSocketId, io } = require('../../socket/socket')
const convo = require('../model/convModel')
const messages = require('../model/messages')
exports.sendmessage = async(req,res)=>{
    try {
        const {message} = req.body
        const {id:receiverId} = req.params
       const senderId = req.user?._id

       let chats = await convo.findOne({
           participants: {$all: [senderId,receiverId]}
           
        })
        if(!chats){
            chats = await convo.create({
                participants :[senderId,receiverId],
            })
        }
        const newmessages = new messages({
            senderId,
            receiverId,
            message,
            conversation:chats._id
        })
        if(newmessages){
            chats.message.push(newmessages._id)
           await chats.save()

        }
        await Promise.all([chats.save(),newmessages.save()])

        let receiversocketId = getReciverSocketId(receiverId)

            if(receiversocketId ){
                io.to(receiversocketId).emit("newmessages",newmessages)
            }
        
        res.status(201).json(newmessages)
    } catch (error){
          console.error("SEND MESSAGE ERROR:", error , error.message);
  res.status(500).json({
    success: false,
    msg: "Internal server error",
    error: error.message,
    stack: error.stack
  })
    }
}

exports.getmessage = async(req,res)=>{
    try {
        const {id:receiverId} = req.params
       const senderId = req.user?._id
        const chats = await convo.findOne({
            participants:{$all:[senderId,receiverId]}

        }).populate('message')
        if(!chats) return res.status(200).json([])
            const messages = chats.message
        res.status(200).json(messages)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:"servor error",error:error.message})
    }
}