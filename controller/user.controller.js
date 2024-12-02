const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const RemedyModel = require("../models/RemedyModel");
const reqModel = require("../models/UserRequest");

const userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.send("invalid Credntial");
    }

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send("invalid credentials");
    }
    const token = user.generateToken();
    res.status(200).json({ msg: "login successfully done", token: token });
  } catch (error) {
    res.status(404).send(`Internal server side error ${error}`);
  }
};

const usersignup = async (req, res) => {
  try {
    const { fullname, email, password, ph_no } = req.body;
    const existUser = await userModel.findOne({ email: email });
    if (existUser) {
      return res.status(409).json({msg : "Email Already register"});
    }
    const user = await userModel.create({ fullname, email, password, ph_no });
    const token = user.generateToken();
    res
      .status(201)
      .json({ msg: "User Created", token, userid: user._id.toString() });
  } catch (error) {
    res.status(404).send(`Internal server side error ${error}`);
  }
};

const CreateRemedies = async (req, res) => {
  try {
    const { title, description, ingredients, steps, ailments, effectiveness } =
      req.body;
    const Remedy = await RemedyModel.create({
      userId: req.userId,
      title,
      description,
      ingredients,
      steps,
      ailments,
      effectiveness,
      image: req.file.buffer,
    });

    if (!Remedy) {
      return res.status(401).json({ meg: "Failed To Create Remedy" });
    }
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    user.remedyList.push(Remedy._id);
    await user.save();
    res.send("remedy created Success");
  } catch (error) {
    res.status(`somthing went wrong : ${error} `);
  }
};

const showMyRemedy = async (req, res) => {
  try {
    const data = await RemedyModel.find({ userId: req.userId });
    res.status(200).json({ msg: "YOUR Remedies", data });
  } catch (error) {
    res.status(500).json({ error: `Internal server error: ${error.message}` });
  }
};

const mybookmarks = async (req, res) => {
  const user = await userModel.findOne({ _id: req.userId });

  if (!user) {
    console.log("user not found!");
    return;
  }

  res.status(200).json({ msg: "saved Remedy found", data: user.bookMarks });
};

const mybookmarksdetail = async (req, res) => {
  try {
    const remedy = await RemedyModel.findOne({ _id: req.body.remedyId });
    if (!remedy) {
      return res.send("Remedy Not found !");
    }
    res.status(200).json({
      msg: "Remedy found",
      remedydetail: {
        title: remedy.title,
        desc: remedy.description,
        img: remedy.image,
        Id: remedy._id,
      },
    });
  } catch (error) {
    res.send(`Internal server error : ${error}`);
  }
};

const verifyemail = async (req, res) => {
  try {
    const response = await userModel.find({ isDoctor: true }).select("email");
    response.map((res, idx) => {
      if (res.email === req.body.email) {
        return res.status(200).send("verified");
      }
    });
    res.status(401).send("Invalid Email");
  } catch (error) {
    res.send(`Internal server error : ${error}`);
  }
};

const connectToDr = async (req, res) => {
  try {
    const response = await reqModel.create({
      userId: req.userId,
      doctorEmail: req.body.doctorEmail,
      queryType: req.body.queryType,
      reqDescription: req.body.reqDescription,
    });
    if (!response) {
      return;
    }
    res.status(200).json({ msg: "Success" });
  } catch (error) {
    res.status(500).json({ msg: `Internal Server Error: ${error.message}` });
  }
};

const updateProfile = async (req, res) => {
  try {
    try {
      const userId = req.userId;
      const user = await userModel.findById(userId);

      if (!user) {
        return res.status(404).send("User not found");
      }

      // If a profile image is uploaded, process it
      if (req.file) {
        user.profileimg = req.file.buffer; // Save the image buffer (you can also save the file name/path)
      }

      // Save user updates
      await user.save();

      res.status(200).json({ msg: "Profile updated successfully" });
    } catch (error) {
      res.status(500).send(`Internal server error: ${error.message}`);
    }
  } catch (error) {
    res.send(`Internal Server error : ${error}`);
  }
};

const editProfile = async (req, res) => {
  try {
    const { fullname, email, location, bio, ph_no, preferredLanguage } =
      req.body;
    const userId = req.userId;

    // Check if userId exists
    if (!userId) {
      return res.status(400).send("User ID is missing");
    }

    // Prepare the fields to update
    const updateFields = {};
    if (fullname) updateFields.fullname = fullname;
    if (email) updateFields.email = email;
    if (location) updateFields.location = location;
    if (bio) updateFields.bio = bio;
    if (ph_no) updateFields.ph_no = ph_no;
    if (preferredLanguage) updateFields.preferredLanguage = preferredLanguage;

    // Update the user document
    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      { $set: updateFields },
      { new: true, runValidators: true }
    );

    // Check if the user was found and updated
    if (!updatedUser) {
      return res.status(404).send("User not found");
    }

    res.status(200).send("Profile updated successfully");
  } catch (error) {
    res.status(500).send(`Internal server error: ${error.message}`);
  }
};

module.exports = {
  userlogin,
  usersignup,
  CreateRemedies,
  showMyRemedy,
  mybookmarks,
  mybookmarksdetail,
  verifyemail,
  connectToDr,
  updateProfile,
  editProfile,
};
