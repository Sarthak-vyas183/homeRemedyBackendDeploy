const userModel = require("../models/userModel")

const isDoctor  = async(req , res, next) => {
     try {
        if(!req.userId) {
            return res.send("Unauthorized access ! Access denied");
        }  
        const user = await userModel.findOne({_id : req.userId});
         if(!user) {
            return res.send("Unauthorized user");
         }
         if(user.isDoctor === false) {
           return res.send("Access denied")
         } 
         next();
     } catch (error) {
        res.status(500).send(`Internal server error ${error}`)
     }
}

module.exports = isDoctor