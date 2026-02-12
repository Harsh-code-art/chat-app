const { jsonwebtoken } = require("../../utils/jsonwebtoken");
const User = require("../model/UserSchema");
const bcrypt = require("bcryptjs");
exports.Register = async (req, res) => {
  try {
    const { fullname, username, email, gender, password, profilepic } =
      req.body;
    if (!fullname || !username || !email || !gender || !password) {
      res.status(404).json({ mssg: "all field required" });
    }
    const find = await User.findOne({  email });
    if (find)
      return res
        // .status(401)
        .json({ message: "user already exsist", success: false });
    const hashpasword = bcrypt.hashSync(password, 10);
    const profileboy =
      profilepic ||
      `https://avatar.iran.liara.run/public/boy?username${username}`;
    const profilegirl =
      profilepic ||
      `https://avatar.iran.liara.run/public/girl?username${username}`;

    const user = await User.create({
      fullname,
      username,
      email,
      gender,
      password: hashpasword,
      profilepic: gender === "male" ? profileboy : profilegirl,
    });

    if (user) {
      await user.save();
      jsonwebtoken(user._id, res);
    } else {
      res.status(404).json({ message: "invalid user data", success: false });
    }
    res
      .status(200)
      .json({
        message: "user register",
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        profilepic: user.profilepic,
        success:true
      });
  } catch (error) {
    res.status(500).json({ message: "servor error", error: error.message ,success : false});
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(301).json({ mssg: "all field required" });
    const find = await User.findOne({ email });
    if (!find)
      return res.status(404).json({ mssg: "user not found ", success: false });
    const compare = await bcrypt.compare(password, find.password);
    if (!compare)
      return res
        // .status(404)
        .json({ message: "password not match", success: false });
    jsonwebtoken(find._id, res);
    res
      .status(201)
      .json({
        message: "login sucess",
        success: true,
        _id: find._id,
        fullname: find.fullname,
        username: find.username,
        email: find.email,
        profilepic: find.profilepic,
      });
  } catch (error) {
    res.status(500).json({ message: "servor error", error: error.message,success:false });
  }
};
exports.userlogout = async(req,res)=>{
  try {
    res.cookie("jwt","",{
      maxAge:0
    })
    res.status(200).json({message:"logout success",success:true})
  } catch (error) {
    res.status(500).json({ mssg: "servor error", error: error.message });
    
  }
}