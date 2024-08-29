const express = require("express");
const router = express.Router();
const TokenVerify = require("../middleware/TokenVerify.Middelware");
const upload = require("../utiles/multerConfig");
const {
  GetAllRemedies,
  userverification,
  remedydetail,
  remedyReview,
  showComments,
  showCommenter,
  bookmarkRemedy,
  bookmarkornot,
  DeleteAccount,
  SavedrReq
} = require("../controller/Auth.Controller");

router.route("/remedies").get(GetAllRemedies);
router.route("/userverification").get(TokenVerify, userverification);
router.route("/remedydetail/:id").get(remedydetail);
router.route("/comment").post(TokenVerify, remedyReview);
router.route("/showComments").post(showComments);
router.route("/showcommentuser").post(showCommenter);
router.route("/bookmark").post(TokenVerify, bookmarkRemedy);
router.route("/bookmarkornot").post(TokenVerify, bookmarkornot);
router.route("/delete_account").post(TokenVerify, DeleteAccount);
router.route("/become_doctor").post(TokenVerify ,upload.single("RMP_img"), SavedrReq);

module.exports = router;
