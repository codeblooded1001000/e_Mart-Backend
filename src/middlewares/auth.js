const jwt = require('jsonwebtoken')
require('dotenv').config()

function signToken(user){
  return jwt.sign(
    { userId: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  )
}

function verifyToken(req, res){
  if(!(req.headers.authorization)){
    return res.status(404).json({success:false, message: "Error!Token was not provided."})
  }
  try {
    const token = req.headers.authorization.split(' ')[1];
    //Authorization: 'Bearer TOKEN'
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET );
    return decodedToken; 
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(500).json({success:false, message: "Error!Token is expired please login again"})
    } else if (error.name === 'JsonWebTokenError') {
      return res.status(500).json({success:false, message: "Error!Token is not valid."})
    }
  }
}

module.exports = {verifyToken, signToken}