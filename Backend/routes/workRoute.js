const express = require("express");
const router = express.Router();

const { SingUp } = require("../Controllers/Controller.js");

router.post("/signup", SingUp);

module.exports = router;
