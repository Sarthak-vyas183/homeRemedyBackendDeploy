const express = require("express");
const router = express.Router();
const { userlogin , usersignup , CreateRemedies  , showMyRemedy , mybookmarks , mybookmarksdetail , verifyemail , connectToDr} = require("../controller/user.controller");
const signupSchema = require("../validation/signupValidation")
const validate = require("../middleware/validate.middleware")
const TokenVerify = require("../middleware/TokenVerify.Middelware")
const upload = require("../utiles/multerConfig")


router.route("/login").post(userlogin);
router.route("/signup").post(validate(signupSchema) , usersignup);
router.route("/create").post(TokenVerify , upload.single("image") , CreateRemedies); 
router.route("/myremedy").get(TokenVerify , showMyRemedy); 
router.route("/mybookmarks").post(TokenVerify , mybookmarks);
router.route("/mybookmarksdetail").post(mybookmarksdetail);
router.route("/verifyemail").post(verifyemail);
router.route("/connect_to_dr").post(TokenVerify , connectToDr);
module.exports = router;
