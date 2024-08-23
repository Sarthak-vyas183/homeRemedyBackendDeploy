const RemedyModel = require("../models/RemedyModel");
const userModel = require("../models/userModel");
const reqModel = require("../models/UserRequest");

const unverifyedRemedy = async (req, res) => {
  try {
    const remedies = await RemedyModel.find({ isVerified: false });
    if (remedies.length < 1) {
      return res.status(404).json({ msg: "No unverified remedies yet!" });
    }

    res.status(200).json({ msg: "OK! Found", data: remedies });
  } catch (error) {
    res.status(500).send(`Internal server error: ${error}`);
  }
};

const remedyOwner = async (req, res) => {
try {
    const owner = await userModel.findOne({_id: req.body.userId }).select("-password");

    if (!owner) {
      return res.status(404).send("No owner found");
    }

    res.status(200).json({ msg: "Owner found", user: owner });
  } catch (error) {
    res.status(500).send(`Internal server error: ${error}`);
  } 
};

const verifyRemedy = async (req, res) => {
  try {
    const remedy = await RemedyModel.findOneAndUpdate(
      { _id: req.body.remedyId }, // Find remedy by ID
      { isVerified: true }, // Set isVerified to true
      { new: true } // Return the updated document
    );
    if (!remedy) {
      return res.status(404).send(`Remedy Not found`);
    }
    res.status(201).send("Remedy Updated");
  } catch (error) {
    res.status(500).send(`Internal server error ${error}`);
  }
}; 

const getRequests = async (req , res) => {
    try { 
        const user =  await userModel.findOne({_id : req.userId}); 
        if(!user) {
            return res.send("Internal server error !");
        } 
        const requests = await reqModel.find({doctorEmail : user.email});
        if(!reqModel) return res.send("request Not found !");
        res.status(200).json({msg : "requests found !" , data : requests });
    } catch (error) {
        res.status(404).send(`Internal server error : ${error}`) 
    } 
}

module.exports = { unverifyedRemedy, remedyOwner, verifyRemedy , getRequests};
