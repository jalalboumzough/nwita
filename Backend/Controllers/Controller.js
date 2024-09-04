const {
  UserModule,
  NotesModule,
  EmailModule,
} = require("../Modules/DataModule");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//JWT Verification

const jwtAuth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "error " });
  }
  const Validate = jwt.verify(token, process.env.JWT_KEY);
  if (!Validate) {
    return res.status(401).json({ error: "error " });
  }
  const user = jwt.decode(token, true);
  req.user = user;
  next();
};

//All users
const AllUsers = async (req, res) => {
  try {
    const users = await UserModule.find();
    res.json(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
//insert UserSingUp
const SignUp = async (req, res) => {
  const { FullName, UserName, Email, Password, ProfilePicture } = req.body;

  // Validate input
  if (!FullName || !UserName || !Email || !Password || !ProfilePicture) {
    return res
      .status(400)
      .json({ error: "UserName, Email, and Password are required" });
  }

  try {
    // Create a new user with the hashed password
    const newUser = await UserModule.create({
      FullName,
      UserName,
      Email,
      Password,
      ProfilePicture: ProfilePicture.data,
    });

    res.status(201).json({ newUser });
  } catch (error) {
    // Handle errors
    res.status(400).json({ error: error.message });
  }
  try {
    // Create a new user with the hashed password

    res.status(201).json({ newUser });
  } catch (error) {
    // Handle errors
    res.status(400).json({ error: error.message });
  }
};

//Ajouter des  notes controller
const Addnote = async (req, res) => {
  const UserID = req.user.userId;
  const NewNote = ({ NoteTitle, NoteObject, NoteContent, NoteBgColor } =
    req.body);
  if (!NoteTitle || !NoteObject || !NoteContent) {
    return res.status(400).json({ error: "The note is note adding " });
  }
  try {
    const NewNote = await NotesModule.create({
      UserID,
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

/*Recuper tous les notes */

const AllNotes = async (req, res) => {
  const UserID = req.user.userId;
  console.log(UserID);
  try {
    const notes = await NotesModule.find({
      UserID,
    }); // Adjust based on your actual method signature
    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: "No notes found for this user" });
    }
    res.json(notes);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(500).json({ message: "An error occurred while fetching notes" });
  }
};

/*Update User*/
const GetUser = async (req, res) => {
  const userID = req.user.userId;
  try {
    const Users = await UserModule.findById(userID);
    res.json(Users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const UpdateProfile = async (req, res) => {
  try {
    const { FullName, UserName, ProfilePicture } = req.body;
    const userId = req.user.userId;
    const user = await UserModule.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "error" });
    }
    if (ProfilePicture) {
      user.ProfilePicture = ProfilePicture;
    }
    if (FullName) {
      user.FullName = FullName;
    }
    if (UserName) {
      user.UserName = UserName;
    }

    user.save();
    return res.status(200).json({ message: "success" });
  } catch {}
};

const ShowEmails = async (req, res) => {
  try {
    const emails = await EmailModule.findOne({});
    res.json(emails);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update note pin state
const updateNotePinState = async (req, res) => {
  const { noteId, isPinned } = req.body;

  try {
    const updatedNote = await NotesModule.findByIdAndUpdate(
      noteId,
      { isPinned },
      { new: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(updatedNote);
  } catch (error) {
    console.error("Error updating pin state:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  SignUp,
  Addnote,
  AllNotes,
  GetUser,
  UpdateProfile,
  jwtAuth,
  AllUsers,
  ShowEmails,
  updateNotePinState,
};
