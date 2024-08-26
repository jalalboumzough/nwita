const express = require("express");
const router = express.Router();

const { SingUp, Addnote } = require("../Controllers/Controller.js");
const { login } = require("../Controllers/AthuController.js");

router.post("/signup", SingUp);
router.post("/login", login);
router.post("/Addnote", Addnote);

module.exports = router;
