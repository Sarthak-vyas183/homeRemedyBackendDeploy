var jwt = require('jsonwebtoken');
const userModel = require("../models/userModel")
const TokenVerify = async(req , res , next) => {
    const token = req.header("Authorization");
    if(!token) {
     return res.status(404).json({msg : "Unauthorized HTTP : token is not provided"})
   } 
   
    const jwtToken = token.replace("Bearer" , "").trim()
    if(!jwtToken) {
       return res.status(404).json({msg : "Unauthorized HTTP : token is not provided"})
    } 
   
    try {
       const isVerified = jwt.verify(jwtToken , process.env.jwt_secret_key);
      
       const userData = await userModel.findOne({_id : isVerified.userId}).select({password : 0})
       
       req.user = userData;
       req.userId = isVerified.userId;
       req.token = jwtToken
       
       next()
    } catch (error) {
      res.status(401).send(`Invalid token ${error}`) ;
    }
}

module.exports = TokenVerify;