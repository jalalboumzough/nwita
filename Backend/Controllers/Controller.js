const UserModule = require("../Modules/DataModule");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//insert UserSingUp
const SingUp = async (req, res) => {
  const { FullName, UserName, Email, Password } = req.body;
  console.log(req.body);
  // Validate input
  if (!FullName || !UserName || !Email || !Password) {
    return res
      .status(400)
      .json({ error: "UserName, Email, and Password are required" });
  }

  try {
    // Hash the password asynchronously and await its completion
    //const hashedPassword = await bcrypt.hash(Password, 10);

    // Create a new user with the hashed password
    const newUser = await UserModule.create({
      FullName,
      UserName,
      Email,
      Password,
    });
    res.status(201).json({ newUser });
  } catch (error) {
    // Handle errors
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  SingUp,
};
