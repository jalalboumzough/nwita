const express = require("express");
const router = express.Router();

const {
  SignUp,
  Addnote,
  AllNotes,
  GetUser,
  jwtAthu,
  UpdateProfile,
  AllUsers,
  ShowEmails,
} = require("../Controllers/Controller.js");
const { login } = require("../Controllers/AthuController.js");

router.post("/signup", SignUp);
router.post("/login", login);
router.post("/Addnote", Addnote);

router.get("/AllNotes", AllNotes);
router.get("/User", jwtAthu, GetUser);
router.post("/Users", AllUsers);
router.post("/UpdateProfile", jwtAthu, UpdateProfile);
router.post("/emails", ShowEmails);

module.exports = router;
