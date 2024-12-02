const express = require("express");
const router = express.Router();
const TokenVerify = require("../middleware/TokenVerify.Middelware");
const isAdmin = require("../middleware/IsAdmin.middleware");
const { showverificationRequest , getUserData, verifyApplicant, declineApplicant} = require("../controller/Admin.Controller");

router.route("/verifyReq").post(
TokenVerify, isAdmin, showverificationRequest
);
router.route("/applicant").post(TokenVerify , getUserData)

router.route("/verify-applicant").post(TokenVerify, isAdmin, verifyApplicant);

router.route("/decline-applicant").post(TokenVerify, isAdmin, declineApplicant )

module.exports = router;