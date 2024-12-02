const DrReqModel = require("../models/Dr.req.model");
const userModel = require("../models/userModel");

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
    const user = await userModel.findOne({ _id: req.body.userId });

    if (!user) return res.status(404).send("not found : user");

    res.status(200).json({ applicant: user });
  } catch (error) {
    res.send(`applicant not found ${error}`);
  }
};

const verifyApplicant = async (req, res) => {
  try {
    const user = await userModel.findById(req.body.userId);
    const application = await DrReqModel.findById(req.body._id);

    if (!application) {
      res.status(404).json({ msg: "Either application resolve or deleted" });
    }

    if (!user) {
      res.status(404).json({ msg: "Applicant not found : Account Deleted" });
    }
    user.isDoctor = true;
    await user.save();
    await application.deleteOne();

    res.status(200).json({ msg: "Application verified successfully" });
  } catch (error) {
    res.status(500).json({ msg: "internal server error" });
  }
};

const declineApplicant = async (req, res) => {
  try {
    const application = await DrReqModel.findByIdAndDelete(req.body._id);
    if (!application) {
      res.status(404).json({ msg: "Application Revert Back by user" });
    }
    res.status(200).json({ msg: "You have decline the Application" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = {
  showverificationRequest,
  getUserData,
  verifyApplicant,
  declineApplicant,
};
