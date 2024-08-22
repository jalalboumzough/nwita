const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

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
    data: Buffer,
    contentType: String,
  },
});

UserSchema.pre("save", async function (next) {
  this.Password = await bcrypt.hash(this.Password, 10);

  next();
});

module.exports = mongoose.model("User", UserSchema);
