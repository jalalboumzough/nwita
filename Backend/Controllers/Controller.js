const { UserModule, NotesModule } = require("../Modules/DataModule");
const mongoose = require("mongoose");

//insert UserSingUp
const SingUp = async (req, res) => {
  const { FullName, UserName, Email, Password, ProfilePicture } = req.body;
  console.log(req.body);
  // Validate input
  if (!FullName || !UserName || !Email || !Password || !ProfilePicture) {
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
      ProfilePicture: `data:${ProfilePicture.contentType};base64,${ProfilePicture.data}`, // Save as full Base64 string
    });
    res.status(201).json({ newUser });
  } catch (error) {
    // Handle errors
    res.status(400).json({ error: error.message });
  }
};

const Addnote = async (req, res) => {
  const NewNote = ({ NoteTitle, NoteObject, NoteContent, NoteBgColor } = req.body);
    console.log(req.body);
  // Validate input
  if (!NoteTitle || !NoteObject || !NoteContent) {
    return res.status(400).json({ error: "The note is note adding " });
  }
  try {
    const NewNote = await NotesModule.create({
      NoteTitle,
      NoteObject,
      NoteContent,
      NoteBgColor,
    });
    res.status(201).json({ NewNote });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  SingUp,
  Addnote,
};
