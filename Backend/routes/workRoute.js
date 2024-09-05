const express = require("express");
const router = express.Router();

const {
  SignUp,
  Addnote,
  AllNotes,
  GetUser,
  jwtAuth,
  UpdateProfile,
  AllUsers,
  ShowEmails,
  updateNotePinState,
} = require("../Controllers/Controller.js");
const { login } = require("../Controllers/AthuController.js");
const { shearedNotes } = require("../Controllers/ShearedNotes.js");

router.post("/signup", SignUp);
router.post("/login", login);
router.post("/Addnote", jwtAuth, Addnote);

router.post("/AllNotes", jwtAuth, AllNotes);
router.get("/User", jwtAuth, GetUser);
router.post("/Users", AllUsers);
router.post("/UpdateProfile", jwtAuth, UpdateProfile);
router.post("/emails", ShowEmails);

router.put("/updateNotePinState", updateNotePinState);
router.put("/shear", shearedNotes);

module.exports = router;
