const convModel = require('../model/convModel');
const User = require('../model/UserSchema')

exports.getuserbysearch = async(req,res)=>{
    try {
        const search = req.query.search || '';
        const currentuserId = req.user?._id;
        const user = await User.find({
            $and:[{
                $or:[
                    {username:{$regex:'.*'+search+'.*',$options:'i'}},
                    {fullname:{$regex:'.*'+search+'.*',$options:'i'}}
                ]
            },{
                _id:{$ne:currentuserId}
            }]
        }).select("-password").select("email")
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({mssg:"internal servor error",error:error.message,success:false})
    }
}

exports.userchatter = async(req,res)=>{
    try {
  const currentuserId = req.user._id; 

  const chatter = await convModel
    .find({ participants: currentuserId })
    .sort({ updatedAt: -1 });

  if (!chatter || chatter.length === 0) {
    return res.status(200).json([]);
  }

  const participantsIDS = chatter.reduce((ids, convo) => {
    const others = convo.participants.filter(
      (id) => id.toString() !== currentuserId.toString()
    );
    return [...ids, ...others];
  }, []); 

  const users = await User.find({
    _id: { $in: participantsIDS },
  }).select("-password -email");

  res.status(200).json(users);
} catch (error) {
  console.error("userchatter error:", error);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: error.message,
  });
}

}