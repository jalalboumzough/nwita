const express = require("express");
const router = express.Router();

const {
  SingUp,
  Addnote,
  AllNotes,
  GetUser,
  jwtAthu,
  UpdateProfile,
} = require("../Controllers/Controller.js");
const { login } = require("../Controllers/AthuController.js");

router.post("/signup", SingUp);
router.post("/login", login);
router.post("/Addnote", Addnote);

router.get("/AllNotes", AllNotes);
router.get("/User", jwtAthu, GetUser);
router.post("/UpdateProfile",jwtAthu, UpdateProfile);

module.exports = router;
