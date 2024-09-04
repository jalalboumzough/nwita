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
  UserID: {
    type: String,
    required: true,
  },
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
  isPinned: {
    type: Boolean,
    default: false,
  },
});

const EmailsSchema = new Schema({
  UserName: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    require: true,
  },
  ProfilePicture: {
    type: String,
  },
});

const SharedNotesSchema = new Schema({
  UserName: {
    type: String,
    required: true,
  },
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
  ToUsers: {
    type: Object,
    require: true,
  },
});

const UserModule = mongoose.model("User", UserSchema);
const NotesModule = mongoose.model("Notes", NoteSchema);
const EmailModule = mongoose.model("Emails", EmailsSchema);
const SharedNoteModule = mongoose.model("SharedNotes", SharedNotesSchema);

module.exports = {
  UserModule,
  NotesModule,
  EmailModule,
  SharedNoteModule,
};
