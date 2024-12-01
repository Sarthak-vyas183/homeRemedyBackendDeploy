const express = require("express");
const router = express.Router();
const TokenVerify = require("../middleware/TokenVerify.Middelware");
const isAdmin = require("../middleware/IsAdmin.middleware");
const { showverificationRequest , getUserData} = require("../controller/Admin.Controller");

router.route("/verifyReq").post(
TokenVerify, isAdmin, showverificationRequest
);
router.route("/applicant").post(TokenVerify , getUserData)

module.exports = router;