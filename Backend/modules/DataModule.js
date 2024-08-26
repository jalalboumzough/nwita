const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

/* Define the User Schema */
const UserSchema = new Schema({
  FullName: {
    type: String,
    required: true,
  },
  UserName: {
    type: String,
    required: true,
    unique: true,
  },
  Email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "Email address is required"],
  },
  Password: {
    type: String,
    required: true,
  },
  ProfilePicture: {
    type: String,
  },
});

// Hash the password before saving
UserSchema.pre("save", async function (next) {
  if (this.isModified("Password") || this.isNew) {
    this.Password = await bcrypt.hash(this.Password, 10);
  }
  next();
});

/* Define the Note Schema */
const NoteSchema = new Schema({
  NoteTitle: {
    type: String,
    required: true,
  },
  NoteObject: {
    type: String,
    required: true,
  },
  NoteContent: {
    type: String,
    required: true,
  },
  NoteBgColor: {
    type: String,
    required: true,
  },
});

const UserModule = mongoose.model("User", UserSchema);
const NotesModule = mongoose.model("Notes", NoteSchema);

module.exports = {
  UserModule,
  NotesModule,
};
