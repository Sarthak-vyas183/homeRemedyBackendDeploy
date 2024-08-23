const express = require("express");
const router = express.Router();
const TokenVerify = require("../middleware/TokenVerify.Middelware")
const isDoctor = require("../middleware/IsDoctor.middleware");
const {unverifyedRemedy , remedyOwner , verifyRemedy , getRequests} = require("../controller/Doctor.controller");

router.route("/verify").get(TokenVerify ,isDoctor ,unverifyedRemedy);
router.route("/owner").post(TokenVerify ,isDoctor , remedyOwner); 
router.route("/verified").post(TokenVerify , isDoctor , verifyRemedy);
router.route("/requests").post(TokenVerify , isDoctor , getRequests);

module.exports = router;