const express = require("express");
const router = express.Router(); 
const TokenVerify = require("../middleware/TokenVerify.Middelware") ;
const { GetAllRemedies , userverification , remedydetail , remedyReview , showComments , showCommenter , bookmarkRemedy , bookmarkornot} = require('../controller/Auth.Controller'); 


router.route("/remedies").get(GetAllRemedies);
router.route("/userverification").get(TokenVerify , userverification);
router.route("/remedydetail/:id").get(remedydetail);
router.route("/comment").post(TokenVerify ,remedyReview);
router.route("/showComments").post(showComments);
router.route("/showcommentuser").post(showCommenter);
router.route("/bookmark").post(TokenVerify ,bookmarkRemedy)
router.route("/bookmarkornot").post(TokenVerify ,bookmarkornot)
module.exports = router;
