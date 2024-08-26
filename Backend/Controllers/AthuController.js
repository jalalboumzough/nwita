require("dotenv").config();
const {UserModule} = require("../Modules/DataModule");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  const { userName, password } = req.body;
  const user = await UserModule.findOne({ UserName: userName });

  try {
    // en verifier que l'utilisateur exist
    !user && res.status(401).json({ error: "user or password not correct " });

    //en verifier que le password est correct
    const isPasswordValid = await bcrypt.compare(password, user.Password);

    //en cas de password invalid
    !isPasswordValid &&
      res.status(401).json({ error: "user or password not correct" });

    //en cas de du password an user et exist en database
    res.status(200).json({ msg: "all ready" });

    //catch connection
  } catch (error) {
    console.error("Error lars de la connection:", error.message);
    !res.headersSent &&
      res.status(500).json({ error: "Error interne du server" });
  }
};

module.exports = {
  login,
};
