const jwt = require("jsonwebtoken");
const User = require("../model/UserSchema");

exports.islogin = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ success: false, message: "No token" });
    }

    const decoded = jwt.verify(token, process.env.jwt);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("auth error:", error);
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
