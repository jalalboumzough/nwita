require("dotenv").config();
const { UserModule } = require("../Modules/DataModule");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { UserName, Password } = req.body;
  const user = await UserModule.findOne({ UserName });
  console.log(user.Password);

  try {
    // en verifier que l'utilisateur exist
    !user && res.status(401).json({ error: "user or password not correct " });

    //en verifier que le password est correct
    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    //en cas de password invalid
    if (!isPasswordValid) {
      res.status(401).json({ error: "user or password not correct" });
    } else {
      const userpic = user.ProfilePicture;
      //en cas de du password an user et exist en database
      const token = jwt.sign({ userId: user.id }, process.env.JWT_KEY);
      res.status(200).json({
        userpic,
        token,
        msg: "all ready",
      });
    }

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
