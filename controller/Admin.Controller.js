const DrReqModel = require("../models/Dr.req.model");
const userModel = require("../models/userModel")
const showverificationRequest = async (req, res) => {
  try {
    const requests = await DrReqModel.find();
    if (!requests) {
      return res.send("NO Request Found Yet");
    }
    res.status(200).json({ msg: "Requests found : ", data: requests });
  } catch (error) {
    res.send(`Internal server error : ${error}`);
  }
};

const getUserData = async (req, res) => {
   try {
     const user = await userModel.findOne({_id : req.body.userId});
 
     if (!user) return res.status(404).send("not found : user");
       
     res.status(200).json({ applicant: user });
   } catch (error) {
     res.send(`applicant not found ${error}`);
   }
 }; 

module.exports = { showverificationRequest , getUserData };

